import token from '@/utils/token';
import userModel from '@/modules/user/user.model';
import User from '@/modules/user/user.interface';

export default class UserRepository {
    private user = userModel;

    public async create(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<User> {
        try {
            const user = await this.user.create({
                name,
                email,
                password,
                role,
            });
            return user;
        } catch (error) {
            throw new Error('couldnt create user');
        }
    }

    public async findOne(options: {
        name?: string;
        email?: string;
    }): Promise<(User & { _id: any }) | null> {
        try {
            const user = await this.user.findOne(options).exec();
            return user;
        } catch (error) {
            throw new Error('couldnt find user');
        }
    }
}
