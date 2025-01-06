import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermission } from 'src/models/role_permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolePermissionService {
    constructor(
        @InjectRepository(RolePermission)
        private readonly rolePermissionRepository: Repository<RolePermission>
    ) { }

    async findAllRolePermission(): Promise<RolePermission[]> {
        return await this.rolePermissionRepository.find();
    }

    async findOneRolePermission(id: number): Promise<RolePermission> {
        return await this.rolePermissionRepository.findOneBy({ id });
    }

    async createRolePermission(RolePermission: Partial<RolePermission>): Promise<RolePermission> {
        const newRolePermission = await this.rolePermissionRepository.create(RolePermission);
        return await this.rolePermissionRepository.save(newRolePermission);
    }

    async updateRolePermission(id: number, RolePermission: Partial<RolePermission>): Promise<RolePermission> {
        await this.rolePermissionRepository.update(id, RolePermission);
        return await this.findOneRolePermission(id);
    }

    async removeRolePermission(id: number) {
        let RolePermissionData = await this.rolePermissionRepository.findOneBy({ id });
        RolePermissionData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        RolePermissionData.updated_at = new Date(nowDate);
        return await this.updateRolePermission(id, RolePermissionData);
    }
}
