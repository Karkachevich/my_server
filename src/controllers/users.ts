import { Response, Request, NextFunction } from 'express';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import User from '../models/user';

export const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users: any) => res.send({ data: users }))
  .catch(next);

  export const getUserById = (req: Request, res: Response, next: NextFunction) => {
    User.findById(req.params.userId)
      .orFail(new NotFoundError('Нет пользователя'))
      .then((user: any) => {
        res.send({ data: user });
      })
      .catch((err: { name: string; }) => {
        if (err.name === 'CastError') {
          next(new BadRequestError('Некорректные данные'));
        } else {
          next(err);
        }
      });
  };
