import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  },
})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<string, string>();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // Remove user from map
    for (const [userId, socketId] of this.userSockets.entries()) {
      if (socketId === client.id) {
        this.userSockets.delete(userId);
        break;
      }
    }
  }

  @SubscribeMessage('register_user')
  handleRegisterUser(client: Socket, userId: string) {
    this.registerUser(userId, client.id);
    console.log(`User ${userId} registered with socket ${client.id}`);
  }

  registerUser(userId: string, socketId: string) {
    this.userSockets.set(userId, socketId);
  }

  // Emit new review to all users (broadcast)
  emitNewReview(reviewData: any) {
    this.server.emit('new_review', reviewData);
  }

  // Emit new reply to review owner only
  emitNewReply(reviewOwnerId: string, replyData: any) {
    const socketId = this.userSockets.get(reviewOwnerId);
    if (socketId) {
      this.server.to(socketId).emit('new_reply', replyData);
    }
  }

  // Emit like notification to review author
  emitReviewLiked(reviewAuthorId: string, likeData: any) {
    const socketId = this.userSockets.get(reviewAuthorId);
    if (socketId) {
      this.server.to(socketId).emit('review_liked', likeData);
    }
  }

  // Emit admin action (broadcast)
  emitAdminAction(actionData: any) {
    this.server.emit('admin_action', actionData);
  }
}