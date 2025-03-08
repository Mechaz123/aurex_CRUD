import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/models/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>
    ) { }

    async buscarTodosUsuarios(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
    }

    async buscarUnUsuario(id: number): Promise<Usuario> {
        return await this.usuarioRepository.findOneBy({ id });
    }

    async crearUsuario(Usuario: Partial<Usuario>): Promise<Usuario> {
        const nuevoUsuario = await this.usuarioRepository.create(Usuario);
        return await this.usuarioRepository.save(nuevoUsuario);
    }

    async actualizarUsuario(id: number, Usuario: Partial<Usuario>): Promise<Usuario> {
        if (Usuario.clave) {
            const salt = await bcrypt.genSalt(10);
            Usuario.clave = await bcrypt.hash(Usuario.clave, salt);
        }
        await this.usuarioRepository.update(id, Usuario);
        return await this.buscarUnUsuario(id);
    }
}