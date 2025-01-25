import { model, Schema } from 'mongoose';
import { COLLECTION_NAMES } from '../constant/collection-names';

export interface IClickCount {
  count: number;
  user: string;
}

export interface IClickCountDocument extends IClickCount, Document {}

const ClickCountSchema = new Schema(
  {
    count: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
  },
  { timestamps: true }
);

export const ClickCountModel = model(
  COLLECTION_NAMES.ClickCount,
  ClickCountSchema
);
