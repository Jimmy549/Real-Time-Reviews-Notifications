"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const corsOrigins = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',')
        : ['http://localhost:3000', 'http://localhost:5173'];
    app.enableCors({
        origin: corsOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    const port = process.env.PORT || 8080;
    await app.listen(port, '0.0.0.0');
    console.log(`\n🚀 Server running on port ${port}`);
    console.log(`📋 Environment: ${process.env.NODE_ENV}`);
    console.log(`🌐 CORS Origins: ${corsOrigins.join(', ')}`);
}
bootstrap();
//# sourceMappingURL=main.js.map