import { RepliesService } from './replies.service';
export declare class RepliesController {
    private readonly repliesService;
    constructor(repliesService: RepliesService);
    createReply(replyData: any, req: any): Promise<import("./schemas/reply.schema").Reply>;
    getReplies(reviewId: string): Promise<import("./schemas/reply.schema").Reply[]>;
}
