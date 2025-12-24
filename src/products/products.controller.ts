import { Controller, Get, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  async getProducts(@Query('limit') limit: string) {
    // Return mock products for frontend compatibility
    const mockProducts = Array.from({ length: parseInt(limit) || 10 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      price: 10 + (i * 2),
      image: '/images/product.jpg',
      description: `Description for product ${i + 1}`
    }));

    return mockProducts;
  }

  @Get(':id')
  async getProduct(@Query('id') id: string) {
    return {
      id: parseInt(id),
      name: `Product ${id}`,
      price: 25.99,
      image: '/images/product.jpg',
      description: `Description for product ${id}`
    };
  }
}