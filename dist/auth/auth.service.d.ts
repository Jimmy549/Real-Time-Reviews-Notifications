import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(userData: any): Promise<{
        access_token: string;
        user: {
            _id: any;
            username: any;
            email: any;
        };
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            _id: any;
            username: any;
            email: any;
        };
    }>;
    private generateToken;
}
