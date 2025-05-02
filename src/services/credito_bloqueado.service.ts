import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditoBloqueado } from 'src/models/credito_bloqueado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreditoBloqueadoService {
    constructor(
        @InjectRepository(CreditoBloqueado)
        private readonly creditoBloqueadoRepository: Repository<CreditoBloqueado>
    ) { }

    async buscarTodosCreditosBloqueados(): Promise<CreditoBloqueado[]> {
        return await this.creditoBloqueadoRepository.find();
    }

    async buscarUnCreditoBloqueado(id: number): Promise<CreditoBloqueado> {
        return await this.creditoBloqueadoRepository.findOneBy({ id });
    }

    async crearCreditoBloqueado(CreditoBloqueado: Partial<CreditoBloqueado>): Promise<CreditoBloqueado> {
        const nuevoCreditoBloqueado = await this.creditoBloqueadoRepository.create(CreditoBloqueado);
        return await this.creditoBloqueadoRepository.save(nuevoCreditoBloqueado);
    }

    async actualizarCreditoBloqueado(id: number, CreditoBloqueado: Partial<CreditoBloqueado>): Promise<CreditoBloqueado> {
        await this.creditoBloqueadoRepository.update(id, CreditoBloqueado);
        return await this.buscarUnCreditoBloqueado(id);
    }

    async inactivarCreditoBloqueado(id: number) {
        let CreditoBloqueadoData = await this.creditoBloqueadoRepository.findOneBy({ id });
        CreditoBloqueadoData.activo = false;
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        CreditoBloqueadoData.fecha_actualizacion = new Date(fechaActual);
        return await this.actualizarCreditoBloqueado(id, CreditoBloqueadoData);
    }
}
