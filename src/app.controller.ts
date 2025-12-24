import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
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

  @Get('health')
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
}