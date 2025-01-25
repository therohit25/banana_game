import * as StatusCodes from 'http-status';

import { Request, Response } from 'express';
import { generateJwtToken, JwtPayload } from '../helpers/jwt';

import { responseBuilder } from '../helpers/response-builder';
import { IUser } from '../models/user.model';
import { clickCountService } from '../services/click-count.service';
import { userService } from '../services/user.service';

export class UserController {
  async create(req: Request, res: Response) {
    const user = req.body as unknown as IUser;
    try {
      const isUserExist = await userService.getUserByEmailId(user.email);
      if (isUserExist) {
        return res
          .status(StatusCodes.status.BAD_REQUEST)
          .send(
            responseBuilder(
              'User already exists',
              StatusCodes.status.BAD_REQUEST
            )
          );
      }
      const createdUser = await userService.create(user);

      if (createdUser?.id) {
        await clickCountService.createClickCount(createdUser.id);
      }

      return res
        .status(StatusCodes.status.CREATED)
        .send(responseBuilder(createdUser, StatusCodes.status.CREATED));
    } catch (err: any) {
      if (err instanceof Error) {
        console.log(err.message);
        return res.status(StatusCodes.status.BAD_REQUEST).send(err.message);
      } else {
        return res
          .status(StatusCodes.status.INTERNAL_SERVER_ERROR)
          .send('Internal server error');
      }
    }
  }
  async getUserInfo(req: Request, res: Response) {
    try {
      const user = req.headers.user as string;
      const parsedUser = JSON.parse(user) as JwtPayload;

      const result = await userService.getUserById(parsedUser.id);

      return res
        .status(StatusCodes.status.OK)
        .send(responseBuilder(result, StatusCodes.status.OK));
    } catch (err: any) {
      if (err instanceof Error) {
        return res.status(StatusCodes.status.BAD_REQUEST).send(err.message);
      } else {
        return res
          .status(StatusCodes.status.INTERNAL_SERVER_ERROR)
          .send('Internal server error');
      }
    }
  }
  async getUserInfoByUserId(req: Request, res: Response) {
    try {
      const user = req.headers.user as string;
      const userId = req.params.userId;
      const parsedUser = JSON.parse(user) as JwtPayload;

      if (parsedUser.role !== 'admin') {
        return res.status(StatusCodes.status.UNAUTHORIZED).send('Unauthorized');
      }
      const result = await userService.getUserById(userId);

      return res
        .status(StatusCodes.status.OK)
        .send(responseBuilder(result, StatusCodes.status.OK));
    } catch (err: any) {
      if (err instanceof Error) {
        return res.status(StatusCodes.status.BAD_REQUEST).send(err.message);
      } else {
        return res
          .status(StatusCodes.status.INTERNAL_SERVER_ERROR)
          .send('Internal server error');
      }
    }
  }
  async getAllPlayers(_req: Request, res: Response) {
    try {
      const result = await userService.getAllUsersByRole('user');

      return res
        .status(StatusCodes.status.OK)
        .send(responseBuilder(result, StatusCodes.status.OK));
    } catch (err: any) {
      if (err instanceof Error) {
        return res.status(StatusCodes.status.BAD_REQUEST).send(err.message);
      } else {
        return res
          .status(StatusCodes.status.INTERNAL_SERVER_ERROR)
          .send('Internal server error');
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userService.getUserByEmailAndPassword(email, password);
      if (!user) {
        return res
          .status(StatusCodes.status.UNAUTHORIZED)
          .send('Invalid credentials');
      }

      const accesstoken = generateJwtToken(user as unknown as JwtPayload);

      return res
        .send(
          responseBuilder({ token: accesstoken, user }, StatusCodes.status.OK)
        )
        .status(StatusCodes.status.OK);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(StatusCodes.status.BAD_REQUEST).send(error.message);
      } else {
        return res
          .sendStatus(StatusCodes.status.INTERNAL_SERVER_ERROR)
          .send('Internal server error');
      }
    }
  }
  async updateUserInfo(req: Request, res: Response) {
    try {
      const user = req.headers.user as string;
      const userId = req.params.userId;
      const parsedUser = JSON.parse(user) as JwtPayload;
      if (parsedUser.role !== 'admin') {
        return res.status(StatusCodes.status.UNAUTHORIZED).send('Unauthorized');
      }
      const userdata: IUser = req.body as unknown as IUser;
      const result = await userService.updateUser(userdata, userId);
      return res
        .send(responseBuilder(result, StatusCodes.status.OK))
        .status(StatusCodes.status.OK);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(StatusCodes.status.BAD_REQUEST).send(error.message);
      } else {
        return res
          .sendStatus(StatusCodes.status.INTERNAL_SERVER_ERROR)
          .send('Internal server error');
      }
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
      const user = req.headers.user as string;
      const userId = req.params.userId;
      const parsedUser = JSON.parse(user) as JwtPayload;
      if (parsedUser.role !== 'admin') {
        return res.status(StatusCodes.status.UNAUTHORIZED).send('Unauthorized');
      }
      const result = await userService.deleteUser(userId);
      await clickCountService.deleteClickCount(userId);
      return res
        .send(responseBuilder(result, StatusCodes.status.OK))
        .status(StatusCodes.status.OK);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(StatusCodes.status.BAD_REQUEST).send(error.message);
      } else {
        return res
          .sendStatus(StatusCodes.status.INTERNAL_SERVER_ERROR)
          .send('Internal server error');
      }
    }
  }
}
