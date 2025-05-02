import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/models/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>
    ) { }

    async buscarTodosRoles(): Promise<Rol[]> {
        return await this.rolRepository.find();
    }

    async buscarUnRol(id: number): Promise<Rol> {
        return await this.rolRepository.findOneBy({ id });
    }

    async crearRol(Rol: Partial<Rol>): Promise<Rol> {
        const nuevoRol = await this.rolRepository.create(Rol);
        return await this.rolRepository.save(nuevoRol);
    }

    async actualizarRol(id: number, Rol: Partial<Rol>): Promise<Rol> {
        await this.rolRepository.update(id, Rol);
        return await this.buscarUnRol(id);
    }

    async inactivarRol(id: number) {
        let RolData = await this.rolRepository.findOneBy({ id });
        RolData.activo = false;
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        RolData.fecha_actualizacion = new Date(fechaActual);
        return await this.actualizarRol(id, RolData);
    }
}
