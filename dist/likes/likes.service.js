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
exports.LikesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const like_schema_1 = require("./schemas/like.schema");
const reviews_service_1 = require("../reviews/reviews.service");
const notification_gateway_1 = require("../websocket/notification.gateway");
const notifications_service_1 = require("../notifications/notifications.service");
let LikesService = class LikesService {
    constructor(likeModel, reviewsService, notificationGateway, notificationsService) {
        this.likeModel = likeModel;
        this.reviewsService = reviewsService;
        this.notificationGateway = notificationGateway;
        this.notificationsService = notificationsService;
    }
    async likeReview(reviewId, userId) {
        try {
            const existingLike = await this.likeModel.findOne({ reviewId, userId });
            if (existingLike) {
                throw new Error('Already liked');
            }
            const like = new this.likeModel({ reviewId, userId });
            await like.save();
            await this.reviewsService.updateLikesCount(reviewId, 1);
            const review = await this.reviewsService.findById(reviewId);
            if (review && review.userId && review.userId.toString() !== userId) {
                await this.notificationsService.create({
                    receiverId: review.userId.toString(),
                    senderId: userId,
                    type: 'like',
                    message: 'Someone liked your review',
                });
                this.notificationGateway.emitReviewLiked(review.userId.toString(), {
                    reviewId,
                    userId,
                    message: 'Your review was liked',
                });
            }
            return like;
        }
        catch (error) {
            console.error('Error in likeReview:', error);
            throw error;
        }
    }
    async unlikeReview(reviewId, userId) {
        try {
            const like = await this.likeModel.findOneAndDelete({ reviewId, userId });
            if (like) {
                await this.reviewsService.updateLikesCount(reviewId, -1);
            }
        }
        catch (error) {
            console.error('Error in unlikeReview:', error);
            throw error;
        }
    }
    async isLiked(reviewId, userId) {
        const like = await this.likeModel.findOne({ reviewId, userId });
        return !!like;
    }
};
exports.LikesService = LikesService;
exports.LikesService = LikesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(like_schema_1.Like.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        reviews_service_1.ReviewsService,
        notification_gateway_1.NotificationGateway,
        notifications_service_1.NotificationsService])
], LikesService);
//# sourceMappingURL=likes.service.js.map