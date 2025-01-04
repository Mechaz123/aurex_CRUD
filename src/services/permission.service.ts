import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/models/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>
    ) { }

    async findAllPermission(): Promise<Permission[]> {
        return await this.permissionRepository.find();
    }

    async findOnePermission(id: number): Promise<Permission> {
        return await this.permissionRepository.findOneBy({ id });
    }

    async createPermission(Permission: Partial<Permission>): Promise<Permission> {
        const newPermission = await this.permissionRepository.create(Permission);
        return await this.permissionRepository.save(newPermission);
    }

    async updatePermission(id: number, Permission: Partial<Permission>): Promise<Permission> {
        await this.permissionRepository.update(id, Permission);
        return await this.findOnePermission(id);
    }

    async removePermission(id: number) {
        let PermissionData = await this.permissionRepository.findOneBy({ id });
        PermissionData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        PermissionData.updated_at = new Date(nowDate);
        return await this.updatePermission(id, PermissionData);
    }
}
