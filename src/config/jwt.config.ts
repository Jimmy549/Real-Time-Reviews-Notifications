export const JwtConfig = {
  secret: process.env.JWT_ACCESS_SECRET || 'your-jwt-secret-key-here',
  signOptions: { 
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN ? `${process.env.JWT_ACCESS_EXPIRES_IN}s` : '7d',
    issuer: process.env.JWT_ISSUER || 'tea-ecommerce',
    audience: process.env.JWT_AUDIENCE || 'tea-ecommerce-users'
  },
};