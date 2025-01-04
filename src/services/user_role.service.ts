import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/models/user_role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRoleService {
    constructor(
        @InjectRepository(UserRole)
        private readonly userRoleRepository: Repository<UserRole>
    ) { }

    async findAllUserRole(): Promise<UserRole[]> {
        return await this.userRoleRepository.find();
    }

    async findOneUserRole(id: number): Promise<UserRole> {
        return await this.userRoleRepository.findOneBy({ id });
    }

    async createUserRole(UserRole: Partial<UserRole>): Promise<UserRole> {
        const newUserRole = await this.userRoleRepository.create(UserRole);
        return await this.userRoleRepository.save(newUserRole);
    }

    async updateUserRole(id: number, UserRole: Partial<UserRole>): Promise<UserRole> {
        await this.userRoleRepository.update(id, UserRole);
        return await this.findOneUserRole(id);
    }

    async removeUserRole(id: number) {
         let UserRoleData = await this.userRoleRepository.findOneBy({ id });
         UserRoleData.active = false;
         const nowDate = new Date();
         nowDate.setHours(nowDate.getHours() - 5);
         UserRoleData.updated_at = new Date(nowDate);
         return await this.updateUserRole(id, UserRoleData);
    }
}
