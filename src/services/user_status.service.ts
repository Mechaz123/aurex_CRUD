import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStatus } from 'src/models/user_status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserStatusService {
    constructor(
        @InjectRepository(UserStatus)
        private readonly userStatusRepository: Repository<UserStatus>
    ) { }

    async findAllUserStatus(): Promise<UserStatus[]> {
        return await this.userStatusRepository.find();
    }

    async findOneUserStatus(id: number): Promise<UserStatus> {
        return await this.userStatusRepository.findOneBy({ id });
    }

    async createUserStatus(UserStatus: Partial<UserStatus>): Promise<UserStatus> {
        const newUserStatus = await this.userStatusRepository.create(UserStatus);
        return await this.userStatusRepository.save(newUserStatus);
    }

    async updateUserStatus(id: number, UserStatus: Partial<UserStatus>): Promise<UserStatus> {
        await this.userStatusRepository.update(id, UserStatus);
        return await this.findOneUserStatus(id);
    }

    async removeUserStatus(id: number) {
        let UserStatusData = await this.userStatusRepository.findOneBy({ id });
        UserStatusData.active = false;
        return await this.updateUserStatus(id, UserStatusData);
    }
}
