import { celebrate, Joi, Segments } from 'celebrate';
import { isObjectIdOrHexString } from 'mongoose';

export const validateUpdateProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
});

export const validateUpdateAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
});

export const validateCreateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri(),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }).unknown(true),
});

export const validateUserdId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().required().custom((value, helpers) => {
      if (isObjectIdOrHexString(value)) {
        return value;
      }
      return helpers.error('Некорректные данные');
    }),
  }),
});

export const validateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
