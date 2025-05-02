import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credito } from 'src/models/credito.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreditoService {
    constructor(
        @InjectRepository(Credito)
        private readonly creditoRepository: Repository<Credito>
    ) { }

    async buscarTodosCreditos(): Promise<Credito[]> {
        return await this.creditoRepository.find();
    }

    async buscarUnCredito(id: number): Promise<Credito> {
        return await this.creditoRepository.findOneBy({ id });
    }

    async crearCredito(Credito: Partial<Credito>): Promise<Credito> {
        const nuevoCredito = await this.creditoRepository.create(Credito);
        return await this.creditoRepository.save(nuevoCredito);
    }

    async actualizarCredito(id: number, Credito: Partial<Credito>): Promise<Credito> {
        await this.creditoRepository.update(id, Credito);
        return await this.buscarUnCredito(id);
    }

    async inactivarCredito(id: number) {
        let CreditoData = await this.creditoRepository.findOneBy({ id });
        CreditoData.activo = false;
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        CreditoData.fecha_actualizacion = new Date(fechaActual);
        return await this.actualizarCredito(id, CreditoData);
    }
}
