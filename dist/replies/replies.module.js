"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepliesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const replies_controller_1 = require("./replies.controller");
const replies_service_1 = require("./replies.service");
const reply_schema_1 = require("./schemas/reply.schema");
const websocket_module_1 = require("../websocket/websocket.module");
const notifications_module_1 = require("../notifications/notifications.module");
const reviews_module_1 = require("../reviews/reviews.module");
let RepliesModule = class RepliesModule {
};
exports.RepliesModule = RepliesModule;
exports.RepliesModule = RepliesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: reply_schema_1.Reply.name, schema: reply_schema_1.ReplySchema }]),
            websocket_module_1.WebsocketModule,
            notifications_module_1.NotificationsModule,
            reviews_module_1.ReviewsModule,
        ],
        controllers: [replies_controller_1.RepliesController],
        providers: [replies_service_1.RepliesService],
        exports: [replies_service_1.RepliesService],
    })
], RepliesModule);
//# sourceMappingURL=replies.module.js.map