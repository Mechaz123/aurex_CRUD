import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permiso } from 'src/models/permiso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermisoService {
    constructor(
        @InjectRepository(Permiso)
        private readonly permisoRepository: Repository<Permiso>
    ) { }

    async buscarTodosPermisos(): Promise<Permiso[]> {
        return await this.permisoRepository.find();
    }

    async buscarUnPermiso(id: number): Promise<Permiso> {
        return await this.permisoRepository.findOneBy({ id });
    }

    async crearPermiso(Permiso: Partial<Permiso>): Promise<Permiso> {
        const nuevoPermiso = await this.permisoRepository.create(Permiso);
        return await this.permisoRepository.save(nuevoPermiso);
    }

    async actualizarPermiso(id: number, Permiso: Partial<Permiso>): Promise<Permiso> {
        await this.permisoRepository.update(id, Permiso);
        return await this.buscarUnPermiso(id);
    }

    async inactivarPermiso(id: number) {
        let PermisoData = await this.permisoRepository.findOneBy({ id });
        PermisoData.activo = false;
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        PermisoData.fecha_actualizacion = new Date(fechaActual);
        return await this.actualizarPermiso(id, PermisoData);
    }
}
