import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createReply(@Body() replyData: any, @Request() req: any) {
    const reply = await this.repliesService.create({
      ...replyData,
      userId: req.user._id,
    });
    return reply;
  }

  @Get(':reviewId')
  async getReplies(@Param('reviewId') reviewId: string) {
    return this.repliesService.findByReviewId(reviewId);
  }
}