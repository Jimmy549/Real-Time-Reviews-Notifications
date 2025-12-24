import { Document, Types } from 'mongoose';
export declare class Review extends Document {
    productId: string;
    userId: Types.ObjectId;
    content: string;
    rating: number;
    likesCount: number;
}
export declare const ReviewSchema: import("mongoose").Schema<Review, import("mongoose").Model<Review, any, any, any, Document<unknown, any, Review> & Review & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Review, Document<unknown, {}, import("mongoose").FlatRecord<Review>> & import("mongoose").FlatRecord<Review> & {
    _id: Types.ObjectId;
}>;
