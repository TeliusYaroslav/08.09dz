import { UserRepository } from './userRepository'

export class UserService {
    private userRepository = new UserRepository()

    async getUserByEmail(email: string) {
        if (!email) {
            throw new Error('Email is required')
        }
        return this.userRepository.findUserByEmail(email)
    }

    async registerUser(userData: { username: string; email: string; password: string }) {
        return this.userRepository.createUser(userData)
    }
}
 