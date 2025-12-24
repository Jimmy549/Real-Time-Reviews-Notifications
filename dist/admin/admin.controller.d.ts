import { ReviewsService } from '../reviews/reviews.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationGateway } from '../websocket/notification.gateway';
export declare class AdminController {
    private reviewsService;
    private notificationsService;
    private notificationGateway;
    constructor(reviewsService: ReviewsService, notificationsService: NotificationsService, notificationGateway: NotificationGateway);
    deleteReview(reviewId: string, reason: {
        reason: string;
    }): Promise<{
        message: string;
    }>;
    flagReview(reviewId: string, data: {
        reason: string;
    }): Promise<{
        message: string;
    }>;
}
