import { Model } from 'mongoose';
import { Notification } from './schemas/notification.schema';
export declare class NotificationsService {
    private notificationModel;
    constructor(notificationModel: Model<Notification>);
    create(notificationData: any): Promise<Notification>;
    findByReceiverId(receiverId: string): Promise<Notification[]>;
    markAsRead(id: string): Promise<void>;
}
