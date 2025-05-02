import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoUsuario } from 'src/models/estado_usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadoUsuarioService {
    constructor(
        @InjectRepository(EstadoUsuario)
        private readonly estadoUsuarioRepository: Repository<EstadoUsuario>
    ) { }

    async buscarTodosEstadosUsuario(): Promise<EstadoUsuario[]> {
        return await this.estadoUsuarioRepository.find();
    }

    async buscarUnEstadoUsuario(id: number): Promise<EstadoUsuario> {
        return await this.estadoUsuarioRepository.findOneBy({ id });
    }

    async crearEstadoUsuario(EstadoUsuario: Partial<EstadoUsuario>): Promise<EstadoUsuario> {
        const nuevoEstadoUsuario = await this.estadoUsuarioRepository.create(EstadoUsuario);
        return await this.estadoUsuarioRepository.save(nuevoEstadoUsuario);
    }

    async actualizarEstadoUsuario(id: number, EstadoUsuario: Partial<EstadoUsuario>): Promise<EstadoUsuario> {
        await this.estadoUsuarioRepository.update(id, EstadoUsuario);
        return await this.buscarUnEstadoUsuario(id);
    }

    async inactivarEstadoUsuario(id: number) {
        let EstadoUsuarioData = await this.estadoUsuarioRepository.findOneBy({ id });
        EstadoUsuarioData.activo = false;
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        EstadoUsuarioData.fecha_actualizacion = new Date(fechaActual);
        return await this.actualizarEstadoUsuario(id, EstadoUsuarioData);
    }
}
