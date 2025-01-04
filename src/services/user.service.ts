import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async findAllUser(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOneUser(id: number): Promise<User> {
        return await this.userRepository.findOneBy({ id });
    }

    async createUser(User: Partial<User>): Promise<User> {
        const newUser = await this.userRepository.create(User);
        return await this.userRepository.save(newUser);
    }

    async updateUser(id: number, User: Partial<User>): Promise<User> {
        await this.userRepository.update(id, User);
        return await this.findOneUser(id);
    }
}