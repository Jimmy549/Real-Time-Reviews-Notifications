import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like } from './schemas/like.schema';
import { ReviewsService } from '../reviews/reviews.service';
import { NotificationGateway } from '../websocket/notification.gateway';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<Like>,
    private reviewsService: ReviewsService,
    private notificationGateway: NotificationGateway,
    private notificationsService: NotificationsService,
  ) {}

  async likeReview(reviewId: string, userId: string): Promise<Like> {
    try {
      const existingLike = await this.likeModel.findOne({ reviewId, userId });
      if (existingLike) {
        throw new Error('Already liked');
      }

      const like = new this.likeModel({ reviewId, userId });
      await like.save();
      await this.reviewsService.updateLikesCount(reviewId, 1);

      // Get review to find author
      const review = await this.reviewsService.findById(reviewId);
      
      if (review && review.userId && review.userId.toString() !== userId) {
        // Store notification in DB
        await this.notificationsService.create({
          receiverId: review.userId.toString(),
          senderId: userId,
          type: 'like',
          message: 'Someone liked your review',
        });

        // Emit real-time event to review author
        this.notificationGateway.emitReviewLiked(review.userId.toString(), {
          reviewId,
          userId,
          message: 'Your review was liked',
        });
      }

      return like;
    } catch (error) {
      console.error('Error in likeReview:', error);
      throw error;
    }
  }

  async unlikeReview(reviewId: string, userId: string): Promise<void> {
    try {
      const like = await this.likeModel.findOneAndDelete({ reviewId, userId });
      if (like) {
        await this.reviewsService.updateLikesCount(reviewId, -1);
      }
    } catch (error) {
      console.error('Error in unlikeReview:', error);
      throw error;
    }
  }

  async isLiked(reviewId: string, userId: string): Promise<boolean> {
    const like = await this.likeModel.findOne({ reviewId, userId });
    return !!like;
  }
}