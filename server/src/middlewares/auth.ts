import type { NextFunction, Request, Response } from 'express';
import { status } from 'http-status';
import { verifyJwtToken } from '../helpers/jwt';
import { responseBuilder } from '../helpers/response-builder';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.accesstoken) {
      const response = responseBuilder<string>(
        'Unauthorized',
        status.UNAUTHORIZED
      );
      res.status(status.UNAUTHORIZED).send(response);
    } else {
      const data = verifyJwtToken(req.headers.accesstoken as string);
      req.headers['user'] = JSON.stringify(data);
      next();
    }
  } catch (err) {
    const response = responseBuilder<string>(
      'Unauthorized',
      status.UNAUTHORIZED
    );
    res.status(status.UNAUTHORIZED).send(response);
  }
};
