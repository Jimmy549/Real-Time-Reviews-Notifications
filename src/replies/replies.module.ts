import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepliesController } from './replies.controller';
import { RepliesService } from './replies.service';
import { Reply, ReplySchema } from './schemas/reply.schema';
import { WebsocketModule } from '../websocket/websocket.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { ReviewsModule } from '../reviews/reviews.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reply.name, schema: ReplySchema }]),
    WebsocketModule,
    NotificationsModule,
    ReviewsModule,
  ],
  controllers: [RepliesController],
  providers: [RepliesService],
  exports: [RepliesService],
})
export class RepliesModule {}