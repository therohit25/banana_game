import { Request, Response } from "express";
import * as StatusCodes from "http-status";
import { JwtPayload } from "../helpers/jwt";
import { responseBuilder } from "../helpers/response-builder";
import { clickCountService } from "../services/click-count.service";

export class ClickCountController {
  async getCountByUser(req: Request, res: Response) {
    try {
      const user = req.headers.user as string;
      const parsedUser = JSON.parse(user) as JwtPayload;
      const result = await clickCountService.getCountByUser(parsedUser.id);
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
  async updateCountByUser(req: Request, res: Response) {
    try {
      const user = req.headers.user as string;
      const parsedUser = JSON.parse(user) as JwtPayload;
      const count = Number(req.body.count);
      const result = await clickCountService.updateUserCount(
        count,
        parsedUser.id
      );
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
  async getPlayersWithCount(_req: Request, res: Response) {
    try {
      let result = await clickCountService.getPlayersWithCount();

      const fileredResult = result.map((player: any) => {
        const { _doc } = player;
        const { user, ...rest } = _doc;
        return {
          ...rest,
          email: user.email,
          userId: user._id,
        };
      });
      res
        .status(StatusCodes.status.OK)
        .send(responseBuilder(fileredResult, StatusCodes.status.OK));
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
}
