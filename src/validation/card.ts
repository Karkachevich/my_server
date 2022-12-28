import { celebrate, Joi, Segments } from 'celebrate';
import { isObjectIdOrHexString } from 'mongoose';

export const validateCreateCard = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
});

export const validateCardId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().custom((value, helpers) => {
      if (isObjectIdOrHexString(value)) {
        return value;
      }
      return helpers.error('Некорректные данные');
    }),
  }),
});
