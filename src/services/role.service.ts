import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/models/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) { }

    async findAllRole(): Promise<Role[]> {
        return await this.roleRepository.find();
    }

    async findOneRole(id: number): Promise<Role> {
        return await this.roleRepository.findOneBy({ id });
    }

    async createRole(Role: Partial<Role>): Promise<Role> {
        const newRole = await this.roleRepository.create(Role);
        return await this.roleRepository.save(newRole);
    }

    async updateRole(id: number, Role: Partial<Role>): Promise<Role> {
        await this.roleRepository.update(id, Role);
        return await this.findOneRole(id);
    }

    async removeRole(id: number) {
        let RoleData = await this.roleRepository.findOneBy({ id });
        RoleData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        RoleData.updated_at = new Date(nowDate);
        return await this.updateRole(id, RoleData);
    }
}
