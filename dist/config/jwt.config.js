"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtConfig = void 0;
exports.JwtConfig = {
    secret: process.env.JWT_ACCESS_SECRET || 'your-jwt-secret-key-here',
    signOptions: {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN ? `${process.env.JWT_ACCESS_EXPIRES_IN}s` : '7d',
        issuer: process.env.JWT_ISSUER || 'tea-ecommerce',
        audience: process.env.JWT_AUDIENCE || 'tea-ecommerce-users'
    },
};
//# sourceMappingURL=jwt.config.js.map