import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoSubasta } from 'src/models/estado_subasta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadoSubastaService {
    constructor(
        @InjectRepository(EstadoSubasta)
        private readonly estadoSubastaRepository: Repository<EstadoSubasta>
    ) { }

    async buscarTodosEstadoSubasta(): Promise<EstadoSubasta[]> {
        return await this.estadoSubastaRepository.find();
    }

    async buscarUnEstadoSubasta(id: number): Promise<EstadoSubasta> {
        return await this.estadoSubastaRepository.findOneBy({ id });
    }

    async crearEstadoSubasta(EstadoSubasta: Partial<EstadoSubasta>): Promise<EstadoSubasta> {
        const nuevoEstadoSubasta = await this.estadoSubastaRepository.create(EstadoSubasta);
        return await this.estadoSubastaRepository.save(nuevoEstadoSubasta);
    }

    async actualizarEstadoSubasta(id: number, EstadoSubasta: Partial<EstadoSubasta>): Promise<EstadoSubasta> {
        await this.estadoSubastaRepository.update(id, EstadoSubasta);
        return await this.buscarUnEstadoSubasta(id);
    }

    async inactivarEstadoSubasta(id: number) {
        let EstadoSubastaData = await this.estadoSubastaRepository.findOneBy({ id });
        EstadoSubastaData.activo = false;
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        EstadoSubastaData.fecha_actualizacion = new Date(fechaActual);
        return await this.actualizarEstadoSubasta(id, EstadoSubastaData);
    }
}
