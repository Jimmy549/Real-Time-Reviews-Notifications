import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    getNotifications(req: any): Promise<import("./schemas/notification.schema").Notification[]>;
    markAsRead(id: string): Promise<{
        message: string;
    }>;
}
