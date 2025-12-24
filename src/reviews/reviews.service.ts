import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schemas/review.schema';
import { NotificationGateway } from '../websocket/notification.gateway';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    private notificationGateway: NotificationGateway,
    private notificationsService: NotificationsService,
  ) {}

  async create(reviewData: any): Promise<Review> {
    const review = new this.reviewModel(reviewData);
    const savedReview = await review.save();
    const populatedReview = await this.reviewModel
      .findById(savedReview._id)
      .populate('userId', 'username profileImage');

    // Store notification in DB (broadcast to all users)
    await this.notificationsService.create({
      receiverId: 'broadcast',
      senderId: reviewData.userId,
      type: 'review',
      message: `${populatedReview.userId?.username || 'Someone'} added a new review`,
      reviewId: savedReview._id,
    });

    // Emit real-time event
    this.notificationGateway.emitNewReview(populatedReview);

    return populatedReview;
  }

  async findByProductId(productId: string): Promise<Review[]> {
    return this.reviewModel
      .find({ productId })
      .populate('userId', 'username profileImage')
      .sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<Review> {
    return this.reviewModel.findById(id).populate('userId', 'username profileImage');
  }

  async delete(id: string): Promise<void> {
    await this.reviewModel.findByIdAndDelete(id);
  }

  async updateLikesCount(reviewId: string, increment: number): Promise<void> {
    try {
      await this.reviewModel.findByIdAndUpdate(reviewId, {
        $inc: { likesCount: increment }
      });
    } catch (error) {
      console.error('Error updating likes count:', error);
      // Don't throw error to prevent breaking the like functionality
    }
  }
}