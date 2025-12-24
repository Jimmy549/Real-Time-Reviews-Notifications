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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
let AppController = class AppController {
    getApiInfo() {
        return {
            message: 'Real-Time Reviews & Notifications API',
            version: '1.0.0',
            status: 'OK',
            timestamp: new Date().toISOString(),
            endpoints: {
                auth: '/auth (POST /register, POST /login)',
                reviews: '/reviews (POST, GET /:productId, DELETE /:id)',
                replies: '/replies (POST, GET /:reviewId)',
                likes: '/likes (POST /:reviewId, DELETE /:reviewId)',
                notifications: '/notifications (GET, PATCH /:id/read)',
                admin: '/admin (DELETE /reviews/:id, PATCH /reviews/:id/flag)',
                products: '/products (PATCH /:id)'
            },
            websocket: 'Socket.IO enabled for real-time notifications'
        };
    }
    getHealthCheck() {
        return {
            status: 'OK',
            database: 'Connected',
            services: {
                auth: 'Available',
                reviews: 'Available',
                websocket: 'Available'
            }
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getApiInfo", null);
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHealthCheck", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map