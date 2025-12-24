import { Controller, Delete, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ReviewsService } from '../reviews/reviews.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationGateway } from '../websocket/notification.gateway';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(
    private reviewsService: ReviewsService,
    private notificationsService: NotificationsService,
    private notificationGateway: NotificationGateway,
  ) {}

  @Delete('reviews/:id')
  async deleteReview(@Param('id') reviewId: string, @Body() reason: { reason: string }) {
    const review = await this.reviewsService.findById(reviewId);
    await this.reviewsService.delete(reviewId);

    await this.notificationsService.create({
      receiverId: review.userId,
      senderId: 'admin',
      type: 'admin',
      message: `Your review was deleted. Reason: ${reason.reason}`,
    });

    this.notificationGateway.emitAdminAction({
      type: 'review_deleted',
      reviewId,
      userId: review.userId,
      reason: reason.reason,
    });

    return { message: 'Review deleted and user notified' };
  }

  @Patch('reviews/:id/flag')
  async flagReview(@Param('id') reviewId: string, @Body() data: { reason: string }) {
    const review = await this.reviewsService.findById(reviewId);

    await this.notificationsService.create({
      receiverId: review.userId,
      senderId: 'admin',
      type: 'admin',
      message: `Your review was flagged. Reason: ${data.reason}`,
    });

    this.notificationGateway.emitAdminAction({
      type: 'review_flagged',
      reviewId,
      userId: review.userId,
      reason: data.reason,
    });

    return { message: 'Review flagged and user notified' };
  }
}