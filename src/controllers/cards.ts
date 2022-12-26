import { Response, Request, NextFunction } from 'express';
import Card from '../models/card';

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
.populate('owner') //TODO
.then((cards) => res.send({ data: cards }))
.catch(next);
