import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: any) {
    try {
      // Basic validation
      if (!userData.email || !userData.password || (!userData.username && !userData.name)) {
        throw new HttpException('Email, password, and name are required', HttpStatus.BAD_REQUEST);
      }
      
      if (userData.password.length < 6) {
        throw new HttpException('Password must be at least 6 characters long', HttpStatus.BAD_REQUEST);
      }

      // Convert name to username if needed
      if (userData.name && !userData.username) {
        userData.username = userData.name;
      }

      return await this.authService.register(userData);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  async login(@Body() loginData: { email: string; password: string }) {
    try {
      if (!loginData.email || !loginData.password) {
        throw new HttpException('Email and password are required', HttpStatus.BAD_REQUEST);
      }
      
      return await this.authService.login(loginData.email, loginData.password);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}