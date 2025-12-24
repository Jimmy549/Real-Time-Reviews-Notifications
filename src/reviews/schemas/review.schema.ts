import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ required: true })
  productId: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ min: 1, max: 5 })
  rating: number;

  @Prop({ default: 0 })
  likesCount: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);