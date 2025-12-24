import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    createReview(reviewData: any, req: any): Promise<import("./schemas/review.schema").Review>;
    getReviews(productId: string): Promise<import("./schemas/review.schema").Review[]>;
    getAllReviews(): Promise<any[]>;
    deleteReview(id: string): Promise<{
        message: string;
    }>;
}
