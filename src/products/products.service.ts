import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { ReviewsService } from '../reviews/reviews.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationGateway } from '../websocket/notification.gateway';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private reviewsService: ReviewsService,
    private notificationsService: NotificationsService,
    private notificationGateway: NotificationGateway,
  ) {}

  async updateProduct(productId: string, updateData: any): Promise<Product> {
    const oldProduct = await this.productModel.findById(productId);
    const updatedProduct = await this.productModel.findByIdAndUpdate(productId, updateData, { new: true });

    // Get all users who reviewed this product
    const reviews = await this.reviewsService.findByProductId(productId);
    const reviewerIds = [...new Set(reviews.map(review => review.userId.toString()))];

    // Notify all reviewers about product update
    for (const reviewerId of reviewerIds) {
      let message = `Product "${updatedProduct.name}" has been updated.`;
      
      if (oldProduct.price !== updatedProduct.price) {
        message += ` Price changed from $${oldProduct.price} to $${updatedProduct.price}.`;
      }
      
      if (oldProduct.stock !== updatedProduct.stock) {
        message += ` Stock updated to ${updatedProduct.stock}.`;
      }

      await this.notificationsService.create({
        receiverId: reviewerId,
        senderId: 'system',
        type: 'admin',
        message,
      });

      this.notificationGateway.emitAdminAction({
        type: 'product_updated',
        productId,
        userId: reviewerId,
        changes: updateData,
        message,
      });
    }

    return updatedProduct;
  }

  async findById(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }
}