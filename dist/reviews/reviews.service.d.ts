import { Model } from 'mongoose';
import { Review } from './schemas/review.schema';
import { NotificationGateway } from '../websocket/notification.gateway';
import { NotificationsService } from '../notifications/notifications.service';
export declare class ReviewsService {
    private reviewModel;
    private notificationGateway;
    private notificationsService;
    constructor(reviewModel: Model<Review>, notificationGateway: NotificationGateway, notificationsService: NotificationsService);
    create(reviewData: any): Promise<Review>;
    findByProductId(productId: string): Promise<Review[]>;
    findById(id: string): Promise<Review>;
    delete(id: string): Promise<void>;
    updateLikesCount(reviewId: string, increment: number): Promise<void>;
}
