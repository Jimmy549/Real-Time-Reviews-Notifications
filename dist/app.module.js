"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_config_1 = require("./config/database.config");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./users/user.module");
const reviews_module_1 = require("./reviews/reviews.module");
const replies_module_1 = require("./replies/replies.module");
const likes_module_1 = require("./likes/likes.module");
const notifications_module_1 = require("./notifications/notifications.module");
const websocket_module_1 = require("./websocket/websocket.module");
const admin_module_1 = require("./admin/admin.module");
const products_module_1 = require("./products/products.module");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            database_config_1.DatabaseConfig,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            reviews_module_1.ReviewsModule,
            replies_module_1.RepliesModule,
            likes_module_1.LikesModule,
            notifications_module_1.NotificationsModule,
            websocket_module_1.WebsocketModule,
            admin_module_1.AdminModule,
            products_module_1.ProductsModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map