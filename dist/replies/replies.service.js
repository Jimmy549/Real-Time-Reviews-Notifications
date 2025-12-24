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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepliesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const reply_schema_1 = require("./schemas/reply.schema");
const notification_gateway_1 = require("../websocket/notification.gateway");
const notifications_service_1 = require("../notifications/notifications.service");
const reviews_service_1 = require("../reviews/reviews.service");
let RepliesService = class RepliesService {
    constructor(replyModel, notificationGateway, notificationsService, reviewsService) {
        this.replyModel = replyModel;
        this.notificationGateway = notificationGateway;
        this.notificationsService = notificationsService;
        this.reviewsService = reviewsService;
    }
    async create(replyData) {
        const reply = new this.replyModel(replyData);
        const savedReply = await reply.save();
        const populatedReply = await this.replyModel
            .findById(savedReply._id)
            .populate('userId', 'username profileImage');
        const review = await this.reviewsService.findById(replyData.reviewId);
        if (review && review.userId && review.userId.toString() !== replyData.userId) {
            await this.notificationsService.create({
                receiverId: review.userId.toString(),
                senderId: replyData.userId,
                type: 'reply',
                message: 'Someone replied to your review',
            });
            this.notificationGateway.emitNewReply(review.userId.toString(), populatedReply);
        }
        return populatedReply;
    }
    async findByReviewId(reviewId) {
        return this.replyModel
            .find({ reviewId })
            .populate('userId', 'username profileImage')
            .sort({ createdAt: 1 });
    }
};
exports.RepliesService = RepliesService;
exports.RepliesService = RepliesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(reply_schema_1.Reply.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notification_gateway_1.NotificationGateway,
        notifications_service_1.NotificationsService,
        reviews_service_1.ReviewsService])
], RepliesService);
//# sourceMappingURL=replies.service.js.map