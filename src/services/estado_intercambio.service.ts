import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoIntercambio } from 'src/models/estado_intercambio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadoIntercambioService {
    constructor(
        @InjectRepository(EstadoIntercambio)
        private readonly estadoIntercambioRepository: Repository<EstadoIntercambio>
    ) { }

    async buscarTodosEstadosIntercambio(): Promise<EstadoIntercambio[]> {
        return await this.estadoIntercambioRepository.find();
    }

    async buscarUnEstadoIntercambio(id: number): Promise<EstadoIntercambio> {
        return await this.estadoIntercambioRepository.findOneBy({ id });
    }

    async crearEstadoIntercambio(EstadoIntercambio: Partial<EstadoIntercambio>): Promise<EstadoIntercambio> {
        const nuevoEstadoIntercambio = await this.estadoIntercambioRepository.create(EstadoIntercambio);
        return await this.estadoIntercambioRepository.save(nuevoEstadoIntercambio);
    }

    async actualizarEstadoIntercambio(id: number, EstadoIntercambio: Partial<EstadoIntercambio>): Promise<EstadoIntercambio> {
        await this.estadoIntercambioRepository.update(id, EstadoIntercambio);
        return await this.buscarUnEstadoIntercambio(id);
    }

    async inactivarEstadoIntercambio(id: number) {
        let EstadoIntercambioData = await this.estadoIntercambioRepository.findOneBy({ id });
        EstadoIntercambioData.activo = false;
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        EstadoIntercambioData.fecha_actualizacion = new Date(fechaActual);
        return await this.actualizarEstadoIntercambio(id, EstadoIntercambioData);
    }
}
