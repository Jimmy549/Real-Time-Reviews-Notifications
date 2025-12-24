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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./schemas/product.schema");
const reviews_service_1 = require("../reviews/reviews.service");
const notifications_service_1 = require("../notifications/notifications.service");
const notification_gateway_1 = require("../websocket/notification.gateway");
let ProductsService = class ProductsService {
    constructor(productModel, reviewsService, notificationsService, notificationGateway) {
        this.productModel = productModel;
        this.reviewsService = reviewsService;
        this.notificationsService = notificationsService;
        this.notificationGateway = notificationGateway;
    }
    async updateProduct(productId, updateData) {
        const oldProduct = await this.productModel.findById(productId);
        const updatedProduct = await this.productModel.findByIdAndUpdate(productId, updateData, { new: true });
        const reviews = await this.reviewsService.findByProductId(productId);
        const reviewerIds = [...new Set(reviews.map(review => review.userId.toString()))];
        for (const reviewerId of reviewerIds) {
            let message = `Product "${updatedProduct.name}" has been updated.`;
            if (oldProduct.price !== updatedProduct.price) {
                message += ` Price changed from $${oldProduct.price} to $${updatedProduct.price}.`;
            }
            if (oldProduct.stock !== updatedProduct.stock) {
                message += ` Stock updated to ${updatedProduct.stock}.`;
            }
            await this.notificationsService.create({
                receiverId: reviewerId,
                senderId: 'system',
                type: 'admin',
                message,
            });
            this.notificationGateway.emitAdminAction({
                type: 'product_updated',
                productId,
                userId: reviewerId,
                changes: updateData,
                message,
            });
        }
        return updatedProduct;
    }
    async findById(id) {
        return this.productModel.findById(id);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        reviews_service_1.ReviewsService,
        notifications_service_1.NotificationsService,
        notification_gateway_1.NotificationGateway])
], ProductsService);
//# sourceMappingURL=products.service.js.map