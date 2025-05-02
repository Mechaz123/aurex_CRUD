import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Intercambio } from 'src/models/intercambio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IntercambioService {
    constructor(
        @InjectRepository(Intercambio)
        private readonly intercambioRepository: Repository<Intercambio>
    ) { }

    async buscarTodosIntercambios(): Promise<Intercambio[]> {
        return await this.intercambioRepository.find();
    }

    async buscarUnIntercambio(id: number): Promise<Intercambio> {
        return await this.intercambioRepository.findOneBy({ id });
    }

    async crearIntercambio(Intercambio: Partial<Intercambio>): Promise<Intercambio> {
        const nuevoIntercambio = await this.intercambioRepository.create(Intercambio);
        return await this.intercambioRepository.save(nuevoIntercambio);
    }

    async actualizarIntercambio(id: number, Intercambio: Partial<Intercambio>): Promise<Intercambio> {
        await this.intercambioRepository.update(id, Intercambio);
        return await this.buscarUnIntercambio(id);
    }

    async inactivarIntercambio(id: number) {
        let IntercambioData = await this.intercambioRepository.findOneBy({ id });
        IntercambioData.activo = false;
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        IntercambioData.fecha_actualizacion = new Date(fechaActual);
        return await this.actualizarIntercambio(id, IntercambioData);
    }
}
