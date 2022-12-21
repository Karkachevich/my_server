import {
    Schema, model, Model, Document,
  } from 'mongoose';
  import validator from 'validator';
  import bcrypt from 'bcryptjs';
  import { regexUrl } from '../constants/regex';

  interface IUser {
    name: string;
    about: string;
    avatar: string;
    password: string;
    email: string;
  }

  interface UserModel extends Model<IUser> {
    findUserByCredentials: (email: string, password: string) =>
     Promise<Document<unknown, any, IUser>>;
  }

  const userSchema = new Schema<IUser, UserModel>({
    name: {
      type: String,
      minlength: [2, 'Должно быть не меньше 2 символов'],
      maxlength: [30, 'Должно быть не больше 30 символов'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'Должно быть не меньше 2 символов'],
      maxlength: [200, 'Должно быть не больше 200 символов'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator(value: string) {
          return regexUrl.test(value);
        },
        message: 'Невалидный URL',
      },
    },
    password: {
      type: String,
      required: [true, 'Нужен пароль'],
      select: false,
    },
    email: {
      type: String,
      required: [true, 'Нужен email'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: 'Невалидный email',
      },
    },
  });
  
  userSchema.static(
    'findUserByCredentials',
    function findUserByCredentials(email: string, password: string) {
      return this.findOne({ email })
        .select('+password')
        .then((user) => {
          if (!user) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
  
          return bcrypt.compare(password, user.password).then((matched) => {
            if (!matched) {
              return Promise.reject(new Error('Неправильные почта или пароль'));
            }
  
            return user;
          });
        });
    },
  );
  
  export default model<IUser, UserModel>('user', userSchema);
