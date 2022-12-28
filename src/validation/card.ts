import { celebrate, Joi, Segments } from 'celebrate';
import { isObjectIdOrHexString } from 'mongoose';

export const validateCreateCard = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
});
