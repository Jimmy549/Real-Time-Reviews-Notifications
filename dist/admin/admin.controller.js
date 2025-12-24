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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const reviews_service_1 = require("../reviews/reviews.service");
const notifications_service_1 = require("../notifications/notifications.service");
const notification_gateway_1 = require("../websocket/notification.gateway");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let AdminController = class AdminController {
    constructor(reviewsService, notificationsService, notificationGateway) {
        this.reviewsService = reviewsService;
        this.notificationsService = notificationsService;
        this.notificationGateway = notificationGateway;
    }
    async deleteReview(reviewId, reason) {
        const review = await this.reviewsService.findById(reviewId);
        await this.reviewsService.delete(reviewId);
        await this.notificationsService.create({
            receiverId: review.userId,
            senderId: 'admin',
            type: 'admin',
            message: `Your review was deleted. Reason: ${reason.reason}`,
        });
        this.notificationGateway.emitAdminAction({
            type: 'review_deleted',
            reviewId,
            userId: review.userId,
            reason: reason.reason,
        });
        return { message: 'Review deleted and user notified' };
    }
    async flagReview(reviewId, data) {
        const review = await this.reviewsService.findById(reviewId);
        await this.notificationsService.create({
            receiverId: review.userId,
            senderId: 'admin',
            type: 'admin',
            message: `Your review was flagged. Reason: ${data.reason}`,
        });
        this.notificationGateway.emitAdminAction({
            type: 'review_flagged',
            reviewId,
            userId: review.userId,
            reason: data.reason,
        });
        return { message: 'Review flagged and user notified' };
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Delete)('reviews/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteReview", null);
__decorate([
    (0, common_1.Patch)('reviews/:id/flag'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "flagReview", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService,
        notifications_service_1.NotificationsService,
        notification_gateway_1.NotificationGateway])
], AdminController);
//# sourceMappingURL=admin.controller.js.map