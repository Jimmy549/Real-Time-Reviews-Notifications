import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    create(userData: Partial<User>): Promise<User>;
}
