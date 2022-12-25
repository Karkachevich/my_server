import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Schema } from 'mongoose';

export interface SessionRequest extends Request {
    user?: string | JwtPayload;
}

export interface IUserIdRequest extends Request {
    _id: Schema.Types.ObjectId;
}
