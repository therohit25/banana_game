import * as StatusCodes from "http-status";

import { Request, Response } from "express";
import { generateJwtToken, JwtPayload } from "../helpers/jwt";

import { responseBuilder } from "../helpers/response-builder";
import { IUser } from "../models/user.model";
import { clickCountService } from "../services/click-count.service";
import { userService } from "../services/user.service";

export class UserController {
  async create(req: Request, res: Response) {
    const user = req.body as unknown as IUser;
    try {
      const isUserExist = await userService.getUserByEmailId(user.email);
      if (isUserExist) {
        res
          .status(StatusCodes.status.BAD_REQUEST)
          .send(
            responseBuilder(
              "User already exists",
              StatusCodes.status.BAD_REQUEST
            )
          );
        return;
      }
      const createdUser = await userService.create(user);

      if (createdUser?.id) {
        await clickCountService.createClickCount(createdUser.id);
      }

      res
        .status(StatusCodes.status.CREATED)
        .send(responseBuilder(createdUser, StatusCodes.status.CREATED));
      return;
    } catch (err: any) {
      if (err instanceof Error) {
        res.status(StatusCodes.status.BAD_REQUEST).send(err.message);
      } else {
        res
          .status(StatusCodes.status.INTERNAL_SERVER_ERROR)
          .send("Internal server error");
      }
      return;
    }
  }
  async getUserInfo(req: Request, res: Response) {
    try {
      const user = req.headers.user as string;
      const parsedUser = JSON.parse(user) as JwtPayload;

      const result = await userService.getUserById(parsedUser.id);

      res
        .status(StatusCodes.status.OK)
        .send(responseBuilder(result, StatusCodes.status.OK));
      return;
    } catch (err: any) {
      if (err instanceof Error) {
        res.status(StatusCodes.status.BAD_REQUEST).send(err.message);
      } else {
        res
          .status(StatusCodes.status.INTERNAL_SERVER_ERROR)
          .send("Internal server error");
      }
      return;
    }
  }
  async getUserInfoByUserId(req: Request, res: Response) {
    try {
      const user = req.headers.user as string;
      const userId = req.params.userId;
      const parsedUser = JSON.parse(user) as JwtPayload;

      if (parsedUser.role !== "admin") {
        res.status(StatusCodes.status.UNAUTHORIZED).send("Unauthorized");
        return;
      }
      const result = await userService.getUserById(userId);

      res
        .status(StatusCodes.status.OK)
        .send(responseBuilder(result, StatusCodes.status.OK));
      return;
    } catch (err: any) {
      if (err instanceof Error) {
        res.status(StatusCodes.status.BAD_REQUEST).send(err.message);
      } else {
        res
          .status(StatusCodes.status.INTERNAL_SERVER_ERROR)
          .send("Internal server error");
      }
      return;
    }
  }
  async getAllPlayers(_req: Request, res: Response) {
    try {
      const result = await userService.getAllUsersByRole("user");

      res
        .status(StatusCodes.status.OK)
        .send(responseBuilder(result, StatusCodes.status.OK));
      return;
    } catch (err: any) {
      if (err instanceof Error) {
        res.status(StatusCodes.status.BAD_REQUEST).send(err.message);
      } else {
        res
          .status(StatusCodes.status.INTERNAL_SERVER_ERROR)
          .send("Internal server error");
      }
      return;
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userService.getUserByEmailAndPassword(email, password);
      if (!user) {
        res.status(StatusCodes.status.UNAUTHORIZED).send("Invalid credentials");
        return;
      }

      const accesstoken = generateJwtToken(user as unknown as JwtPayload);

      res
        .send(
          responseBuilder({ token: accesstoken, user }, StatusCodes.status.OK)
        )
        .status(StatusCodes.status.OK);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(StatusCodes.status.BAD_REQUEST).send(error.message);
      } else {
        res
          .sendStatus(StatusCodes.status.INTERNAL_SERVER_ERROR)
          .send("Internal server error");
      }
      return;
    }
  }
  async updateUserInfo(req: Request, res: Response) {
    try {
      const user = req.headers.user as string;
      const userId = req.params.userId;
      const parsedUser = JSON.parse(user) as JwtPayload;
      if (parsedUser.role !== "admin") {
        res.status(StatusCodes.status.UNAUTHORIZED).send("Unauthorized");
        return;
      }
      const userdata: IUser = req.body as unknown as IUser;
      const result = await userService.updateUser(userdata, userId);
      res
        .send(responseBuilder(result, StatusCodes.status.OK))
        .status(StatusCodes.status.OK);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(StatusCodes.status.BAD_REQUEST).send(error.message);
      } else {
        res
          .sendStatus(StatusCodes.status.INTERNAL_SERVER_ERROR)
          .send("Internal server error");
      }
      return;
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
      const user = req.headers.user as string;
      const userId = req.params.userId;
      const parsedUser = JSON.parse(user) as JwtPayload;
      if (parsedUser.role !== "admin") {
        res.status(StatusCodes.status.UNAUTHORIZED).send("Unauthorized");
        return;
      }
      const result = await userService.deleteUser(userId);
      await clickCountService.deleteClickCount(userId);
      res
        .send(responseBuilder(result, StatusCodes.status.OK))
        .status(StatusCodes.status.OK);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(StatusCodes.status.BAD_REQUEST).send(error.message);
      } else {
        res
          .sendStatus(StatusCodes.status.INTERNAL_SERVER_ERROR)
          .send("Internal server error");
      }
      return;
    }
  }
}
