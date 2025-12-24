"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let NotificationGateway = class NotificationGateway {
    constructor() {
        this.userSockets = new Map();
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
        for (const [userId, socketId] of this.userSockets.entries()) {
            if (socketId === client.id) {
                this.userSockets.delete(userId);
                break;
            }
        }
    }
    handleRegisterUser(client, userId) {
        this.registerUser(userId, client.id);
        console.log(`User ${userId} registered with socket ${client.id}`);
    }
    registerUser(userId, socketId) {
        this.userSockets.set(userId, socketId);
    }
    emitNewReview(reviewData) {
        this.server.emit('new_review', reviewData);
    }
    emitNewReply(reviewOwnerId, replyData) {
        const socketId = this.userSockets.get(reviewOwnerId);
        if (socketId) {
            this.server.to(socketId).emit('new_reply', replyData);
        }
    }
    emitReviewLiked(reviewAuthorId, likeData) {
        const socketId = this.userSockets.get(reviewAuthorId);
        if (socketId) {
            this.server.to(socketId).emit('review_liked', likeData);
        }
    }
    emitAdminAction(actionData) {
        this.server.emit('admin_action', actionData);
    }
};
exports.NotificationGateway = NotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('register_user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], NotificationGateway.prototype, "handleRegisterUser", null);
exports.NotificationGateway = NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: ['http://localhost:3000', 'http://localhost:5173'],
            credentials: true,
        },
    })
], NotificationGateway);
//# sourceMappingURL=notification.gateway.js.map