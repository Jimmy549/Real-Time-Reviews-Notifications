import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { ReviewsService } from '../reviews/reviews.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationGateway } from '../websocket/notification.gateway';
export declare class ProductsService {
    private productModel;
    private reviewsService;
    private notificationsService;
    private notificationGateway;
    constructor(productModel: Model<Product>, reviewsService: ReviewsService, notificationsService: NotificationsService, notificationGateway: NotificationGateway);
    updateProduct(productId: string, updateData: any): Promise<Product>;
    findById(id: string): Promise<Product>;
}
