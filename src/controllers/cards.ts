import { Response, Request, NextFunction } from 'express';
import BadRequestError from '../errors/bad-request-error';
import ForbiddenError from '../errors/forbidden-error';
import NotFoundError from '../errors/not-found-error';
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

export const deleteCard = (req: SessionRequest, res: Response, next: NextFunction) => {
  const { _id } = req.user as IUserIdRequest;

  Card.findById(req.params.cardId).orFail(new NotFoundError('Нет карточки')).then((card) => {
    if (card?.owner.toString() === _id.toString()) {
      return card.remove().then(() => res.send({ data: card, message: 'Данная карточка удалена' })).catch(next);
    } throw new ForbiddenError('попытка удалить чужую карточку');
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

export const likeCard = (req: SessionRequest, res: Response, next: NextFunction) => {
  const { _id } = req.user as IUserIdRequest;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: _id } },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Нет карточки'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

export const dislikeCard = (req: SessionRequest, res: Response, next: NextFunction) => {
  const { _id } = req.user as IUserIdRequest;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: _id } },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Нет карточки'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};
