import { Model } from 'mongoose';
import { Reply } from './schemas/reply.schema';
import { NotificationGateway } from '../websocket/notification.gateway';
import { NotificationsService } from '../notifications/notifications.service';
import { ReviewsService } from '../reviews/reviews.service';
export declare class RepliesService {
    private replyModel;
    private notificationGateway;
    private notificationsService;
    private reviewsService;
    constructor(replyModel: Model<Reply>, notificationGateway: NotificationGateway, notificationsService: NotificationsService, reviewsService: ReviewsService);
    create(replyData: any): Promise<Reply>;
    findByReviewId(reviewId: string): Promise<Reply[]>;
}
