import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(userData: any): Promise<{
        access_token: string;
        user: {
            _id: any;
            username: any;
            email: any;
        };
    }>;
    login(loginData: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            _id: any;
            username: any;
            email: any;
        };
    }>;
}
