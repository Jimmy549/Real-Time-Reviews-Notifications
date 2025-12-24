import { Document, Types } from 'mongoose';
export declare class Reply extends Document {
    reviewId: Types.ObjectId;
    userId: Types.ObjectId;
    content: string;
}
export declare const ReplySchema: import("mongoose").Schema<Reply, import("mongoose").Model<Reply, any, any, any, Document<unknown, any, Reply> & Reply & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Reply, Document<unknown, {}, import("mongoose").FlatRecord<Reply>> & import("mongoose").FlatRecord<Reply> & {
    _id: Types.ObjectId;
}>;
