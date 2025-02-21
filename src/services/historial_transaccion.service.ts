import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorialTransaccion } from 'src/models/historial_transaccion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistorialTransaccionService {
    constructor(
        @InjectRepository(HistorialTransaccion)
        private readonly historialTransaccionRepository: Repository<HistorialTransaccion>
    ) { }

    async buscarTodosHistorialesTransaccion(): Promise<HistorialTransaccion[]> {
        return await this.historialTransaccionRepository.find();
    }

    async buscarUnHistorialTransaccion(id: number): Promise<HistorialTransaccion> {
        return await this.historialTransaccionRepository.findOneBy({ id });
    }

    async crearHistorialTransaccion(HistorialTransaccion: Partial<HistorialTransaccion>): Promise<HistorialTransaccion> {
        const nuevoHistorialTransaccion = await this.historialTransaccionRepository.create(HistorialTransaccion);
        return await this.historialTransaccionRepository.save(nuevoHistorialTransaccion);
    }

    async actualizarHistorialTransaccion(id: number, HistorialTransaccion: Partial<HistorialTransaccion>): Promise<HistorialTransaccion> {
        await this.historialTransaccionRepository.update(id, HistorialTransaccion);
        return await this.buscarUnHistorialTransaccion(id);
    }

    async inactivarHistorialTransaccion(id: number) {
        let HistorialTransaccionData = await this.historialTransaccionRepository.findOneBy({ id });
        HistorialTransaccionData.activo = false;
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        HistorialTransaccionData.fecha_actualizacion = new Date(fechaActual);
        return await this.actualizarHistorialTransaccion(id, HistorialTransaccionData);
    }
}
