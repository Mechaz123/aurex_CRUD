import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRol } from 'src/models/usuario_rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioRolService {
    constructor(
        @InjectRepository(UsuarioRol)
        private readonly usuarioRolRepository: Repository<UsuarioRol>
    ) { }

    async buscarTodosUsuariosRoles(): Promise<UsuarioRol[]> {
        return await this.usuarioRolRepository.find();
    }

    async buscarUnUsuarioRol(id: number): Promise<UsuarioRol> {
        return await this.usuarioRolRepository.findOneBy({ id });
    }

    async crearUsuarioRol(UsuarioRol: Partial<UsuarioRol>): Promise<UsuarioRol> {
        const nuevoUsuarioRol = await this.usuarioRolRepository.create(UsuarioRol);
        return await this.usuarioRolRepository.save(nuevoUsuarioRol);
    }

    async actualizarUsuarioRol(id: number, UsuarioRol: Partial<UsuarioRol>): Promise<UsuarioRol> {
        await this.usuarioRolRepository.update(id, UsuarioRol);
        return await this.buscarUnUsuarioRol(id);
    }

    async inactivarUsuarioRol(id: number) {
        let UsuarioRolData = await this.usuarioRolRepository.findOneBy({ id });
        UsuarioRolData.activo = false;
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        UsuarioRolData.fecha_actualizacion = new Date(fechaActual);
        return await this.actualizarUsuarioRol(id, UsuarioRolData);
    }
}
