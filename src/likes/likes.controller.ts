import { Controller, Post, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':reviewId')
  @UseGuards(JwtAuthGuard)
  async likeReview(@Param('reviewId') reviewId: string, @Request() req: any) {
    try {
      const like = await this.likesService.likeReview(reviewId, req.user._id);
      return { message: 'Review liked', like };
    } catch (error) {
      console.error('Like controller error:', error);
      if (error.message === 'Already liked') {
        return { message: 'Already liked', error: error.message };
      }
      throw error;
    }
  }

  @Delete(':reviewId')
  @UseGuards(JwtAuthGuard)
  async unlikeReview(@Param('reviewId') reviewId: string, @Request() req: any) {
    try {
      await this.likesService.unlikeReview(reviewId, req.user._id);
      return { message: 'Review unliked' };
    } catch (error) {
      console.error('Unlike controller error:', error);
      throw error;
    }
  }
}