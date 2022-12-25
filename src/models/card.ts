import {
  Schema, model,
} from 'mongoose';
import { regexUrl } from '../constants/regex';

  interface ICard {
    name: string;
    link: string;
    owner: Schema.Types.ObjectId;
    likes: Array<Schema.Types.ObjectId>;
    createdAt: Date;
  }

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    require: true,
    minlength: [2, 'Должно быть не меньше 2 символов'],
    maxlength: [30, 'Должно быть не больше 30 символов'],
  },
  link: {
    type: String,
    require: true,
    validate: {
      validator(value: string) {
        return regexUrl.test(value);
      },
      message: 'Невалидный URL',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<ICard>('card', cardSchema);
