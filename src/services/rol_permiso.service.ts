import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolPermiso } from 'src/models/rol_permiso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolPermisoService {
    constructor(
        @InjectRepository(RolPermiso)
        private readonly rolPermisoRepository: Repository<RolPermiso>
    ) { }

    async buscarTodosRolesPermisos(): Promise<RolPermiso[]> {
        return await this.rolPermisoRepository.find();
    }

    async buscarUnRolPermiso(id: number): Promise<RolPermiso> {
        return await this.rolPermisoRepository.findOneBy({ id });
    }

    async crearRolPermiso(RolPermiso: Partial<RolPermiso>): Promise<RolPermiso> {
        const nuevoRolPermiso = await this.rolPermisoRepository.create(RolPermiso);
        return await this.rolPermisoRepository.save(nuevoRolPermiso);
    }

    async actualizarRolPermiso(id: number, RolPermiso: Partial<RolPermiso>): Promise<RolPermiso> {
        await this.rolPermisoRepository.update(id, RolPermiso);
        return await this.buscarUnRolPermiso(id);
    }

    async inactivarRolPermiso(id: number) {
        let RolPermisoData = await this.rolPermisoRepository.findOneBy({ id });
        RolPermisoData.activo = false;
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        RolPermisoData.fecha_actualizacion = new Date(fechaActual);
        return await this.actualizarRolPermiso(id, RolPermisoData);
    }
}
