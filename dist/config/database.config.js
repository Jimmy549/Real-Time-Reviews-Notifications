"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
const mongoose_1 = require("@nestjs/mongoose");
exports.DatabaseConfig = mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
//# sourceMappingURL=database.config.js.map