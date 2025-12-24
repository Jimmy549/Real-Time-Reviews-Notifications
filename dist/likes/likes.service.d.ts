import { Model } from 'mongoose';
import { Like } from './schemas/like.schema';
import { ReviewsService } from '../reviews/reviews.service';
import { NotificationGateway } from '../websocket/notification.gateway';
import { NotificationsService } from '../notifications/notifications.service';
export declare class LikesService {
    private likeModel;
    private reviewsService;
    private notificationGateway;
    private notificationsService;
    constructor(likeModel: Model<Like>, reviewsService: ReviewsService, notificationGateway: NotificationGateway, notificationsService: NotificationsService);
    likeReview(reviewId: string, userId: string): Promise<Like>;
    unlikeReview(reviewId: string, userId: string): Promise<void>;
    isLiked(reviewId: string, userId: string): Promise<boolean>;
}
