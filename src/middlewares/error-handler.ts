import { Request, Response, NextFunction } from 'express';
import { INTERNAL_SERVER_ERROR } from '../constants/status-code';

interface IError {
  statusCode: number;
  message: string;
}

export default function errorHandler(
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message: statusCode === INTERNAL_SERVER_ERROR
      ? 'На сервере произошла ошибка' : message,
  });
}
