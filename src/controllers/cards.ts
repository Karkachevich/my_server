import { Response, Request, NextFunction } from 'express';
import BadRequestError from '../errors/bad-request-error';
import Card from '../models/card';
import { IUserIdRequest, SessionRequest } from '../types';

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
.populate('owner') //TODO
.then((cards) => res.send({ data: cards }))
.catch(next);

export const createCard = async (req: SessionRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const { _id } = req.user as IUserIdRequest;
  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};
