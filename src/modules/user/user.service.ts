import UserModel from '@/modules/user/user.model';
import token from '@/utils/token';
import UserRepository from '@/modules/user/user.repo';

class UserService {
    private userRepo;
    constructor(_userRepo: UserRepository) {
        this.userRepo = _userRepo;
    }

    public async register(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<string | Error> {
        try {
            const user = await this.userRepo.create(
                name,
                email,
                password,
                role
            );

            const accessToken = token.createToken(user);

            return accessToken;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.userRepo.findOne({ email });

            if (!user) {
                throw new Error('Unable to find user with that email address');
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (error) {
            throw new Error('Unable to create user');
        }
    }
}

export default UserService;
