import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './schemas/notification.schema';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<Notification>) {}

  async create(notificationData: any): Promise<Notification> {
    const notification = new this.notificationModel(notificationData);
    return notification.save();
  }

  async findByReceiverId(receiverId: string): Promise<Notification[]> {
    return this.notificationModel
      .find({ receiverId })
      .populate('senderId', 'username profileImage')
      .sort({ createdAt: -1 });
  }

  async markAsRead(id: string): Promise<void> {
    await this.notificationModel.findByIdAndUpdate(id, { isRead: true });
  }
}