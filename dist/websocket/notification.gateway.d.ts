import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private userSockets;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleRegisterUser(client: Socket, userId: string): void;
    registerUser(userId: string, socketId: string): void;
    emitNewReview(reviewData: any): void;
    emitNewReply(reviewOwnerId: string, replyData: any): void;
    emitReviewLiked(reviewAuthorId: string, likeData: any): void;
    emitAdminAction(actionData: any): void;
}
