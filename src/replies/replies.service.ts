import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reply } from './schemas/reply.schema';
import { NotificationGateway } from '../websocket/notification.gateway';
import { NotificationsService } from '../notifications/notifications.service';
import { ReviewsService } from '../reviews/reviews.service';

@Injectable()
export class RepliesService {
  constructor(
    @InjectModel(Reply.name) private replyModel: Model<Reply>,
    private notificationGateway: NotificationGateway,
    private notificationsService: NotificationsService,
    private reviewsService: ReviewsService,
  ) {}

  async create(replyData: any): Promise<Reply> {
    const reply = new this.replyModel(replyData);
    const savedReply = await reply.save();
    const populatedReply = await this.replyModel
      .findById(savedReply._id)
      .populate('userId', 'username profileImage');

    // Get review to find owner
    const review = await this.reviewsService.findById(replyData.reviewId);
    
    if (review && review.userId && review.userId.toString() !== replyData.userId) {
      // Store notification in DB
      await this.notificationsService.create({
        receiverId: review.userId.toString(),
        senderId: replyData.userId,
        type: 'reply',
        message: 'Someone replied to your review',
      });

      // Emit real-time event to review owner only
      this.notificationGateway.emitNewReply(review.userId.toString(), populatedReply);
    }

    return populatedReply;
  }

  async findByReviewId(reviewId: string): Promise<Reply[]> {
    return this.replyModel
      .find({ reviewId })
      .populate('userId', 'username profileImage')
      .sort({ createdAt: 1 });
  }
}