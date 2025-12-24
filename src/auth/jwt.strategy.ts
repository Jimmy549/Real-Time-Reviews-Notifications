import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfig } from '../config/jwt.config';
import { UserService } from '../users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JwtConfig.secret,
      issuer: process.env.JWT_ISSUER || 'tea-ecommerce',
      audience: process.env.JWT_AUDIENCE || 'tea-ecommerce-users',
    });
  }

  async validate(payload: any) {
    return this.userService.findById(payload.sub);
  }
}