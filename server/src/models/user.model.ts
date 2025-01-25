import { model, Schema } from 'mongoose';
import { COLLECTION_NAMES } from '../constant/collection-names';

export interface IUser {
  name: string;
  email: string;
  role: 'admin' | 'user';
  password?: string;
}

export interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      required: true,
    },
    password: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const UserModel = model(COLLECTION_NAMES.Users, UserSchema);
