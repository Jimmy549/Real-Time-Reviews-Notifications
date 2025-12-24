import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createReview(@Body() reviewData: any, @Request() req: any) {
    const review = await this.reviewsService.create({
      ...reviewData,
      userId: req.user._id,
    });
    return review;
  }

  @Get(':productId')
  async getReviews(@Param('productId') productId: string) {
    return this.reviewsService.findByProductId(productId);
  }

  @Get()
  async getAllReviews() {
    // For frontend compatibility - return empty array if no productId
    return [];
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteReview(@Param('id') id: string) {
    await this.reviewsService.delete(id);
    return { message: 'Review deleted successfully' };
  }
}