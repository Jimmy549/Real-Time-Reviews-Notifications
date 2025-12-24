import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ReviewsModule } from '../reviews/reviews.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { WebsocketModule } from '../websocket/websocket.module';

@Module({
  imports: [ReviewsModule, NotificationsModule, WebsocketModule],
  controllers: [AdminController],
})
export class AdminModule {}