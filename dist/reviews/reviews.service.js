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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const review_schema_1 = require("./schemas/review.schema");
const notification_gateway_1 = require("../websocket/notification.gateway");
const notifications_service_1 = require("../notifications/notifications.service");
let ReviewsService = class ReviewsService {
    constructor(reviewModel, notificationGateway, notificationsService) {
        this.reviewModel = reviewModel;
        this.notificationGateway = notificationGateway;
        this.notificationsService = notificationsService;
    }
    async create(reviewData) {
        const review = new this.reviewModel(reviewData);
        const savedReview = await review.save();
        const populatedReview = await this.reviewModel
            .findById(savedReview._id)
            .populate('userId', 'username profileImage');
        await this.notificationsService.create({
            receiverId: 'broadcast',
            senderId: reviewData.userId,
            type: 'review',
            message: `${populatedReview.userId?.username || 'Someone'} added a new review`,
            reviewId: savedReview._id,
        });
        this.notificationGateway.emitNewReview(populatedReview);
        return populatedReview;
    }
    async findByProductId(productId) {
        return this.reviewModel
            .find({ productId })
            .populate('userId', 'username profileImage')
            .sort({ createdAt: -1 });
    }
    async findById(id) {
        return this.reviewModel.findById(id).populate('userId', 'username profileImage');
    }
    async delete(id) {
        await this.reviewModel.findByIdAndDelete(id);
    }
    async updateLikesCount(reviewId, increment) {
        try {
            await this.reviewModel.findByIdAndUpdate(reviewId, {
                $inc: { likesCount: increment }
            });
        }
        catch (error) {
            console.error('Error updating likes count:', error);
        }
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notification_gateway_1.NotificationGateway,
        notifications_service_1.NotificationsService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map