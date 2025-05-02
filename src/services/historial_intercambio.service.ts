import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorialIntercambio } from 'src/models/historial_intercambio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistorialIntercambioService {
    constructor(
        @InjectRepository(HistorialIntercambio)
        private readonly historialIntercambioRepository: Repository<HistorialIntercambio>
    ) { }

    async buscarTodosHistorialIntercambios(): Promise<HistorialIntercambio[]> {
        return await this.historialIntercambioRepository.find();
    }

    async buscarUnHistorialIntercambio(id: number): Promise<HistorialIntercambio> {
        return await this.historialIntercambioRepository.findOneBy({ id });
    }

    async crearHistorialIntercambio(HistorialIntercambio: Partial<HistorialIntercambio>): Promise<HistorialIntercambio> {
        const nuevoHistorialIntercambio = await this.historialIntercambioRepository.create(HistorialIntercambio);
        return await this.historialIntercambioRepository.save(nuevoHistorialIntercambio);
    }

    async actualizarHistorialIntercambio(id: number, HistorialIntercambio: Partial<HistorialIntercambio>): Promise<HistorialIntercambio> {
        await this.historialIntercambioRepository.update(id, HistorialIntercambio);
        return await this.buscarUnHistorialIntercambio(id);
    }

    async inactivarHistorialIntercambio(id: number) {
        let HistorialIntercambioData = await this.historialIntercambioRepository.findOneBy({ id });
        HistorialIntercambioData.activo = false;
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        HistorialIntercambioData.fecha_actualizacion = new Date(fechaActual);
        return await this.actualizarHistorialIntercambio(id, HistorialIntercambioData);
    }
}