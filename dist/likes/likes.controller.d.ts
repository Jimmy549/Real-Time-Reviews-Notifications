import { LikesService } from './likes.service';
export declare class LikesController {
    private readonly likesService;
    constructor(likesService: LikesService);
    likeReview(reviewId: string, req: any): Promise<{
        message: string;
        like: import("./schemas/like.schema").Like;
        error?: undefined;
    } | {
        message: string;
        error: any;
        like?: undefined;
    }>;
    unlikeReview(reviewId: string, req: any): Promise<{
        message: string;
    }>;
}
