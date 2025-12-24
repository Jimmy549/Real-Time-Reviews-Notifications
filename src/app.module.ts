import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ReviewsModule } from './reviews/reviews.module';
import { RepliesModule } from './replies/replies.module';
import { LikesModule } from './likes/likes.module';
import { NotificationsModule } from './notifications/notifications.module';
import { WebsocketModule } from './websocket/websocket.module';
import { AdminModule } from './admin/admin.module';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseConfig,
    AuthModule,
    UserModule,
    ReviewsModule,
    RepliesModule,
    LikesModule,
    NotificationsModule,
    WebsocketModule,
    AdminModule,
    ProductsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}