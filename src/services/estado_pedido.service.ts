import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoPedido } from 'src/models/estado_pedido.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadoPedidoService {
    constructor(
        @InjectRepository(EstadoPedido)
        private readonly estadoPedidoRepository: Repository<EstadoPedido>
    ) { }

    async buscarTodosEstadosPedido(): Promise<EstadoPedido[]> {
        return await this.estadoPedidoRepository.find();
    }

    async buscarUnEstadoPedido(id: number): Promise<EstadoPedido> {
        return await this.estadoPedidoRepository.findOneBy({ id });
    }

    async crearEstadoPedido(EstadoPedido: Partial<EstadoPedido>): Promise<EstadoPedido> {
        const nuevoEstadoPedido = await this.estadoPedidoRepository.create(EstadoPedido);
        return await this.estadoPedidoRepository.save(nuevoEstadoPedido);
    }

    async actualizarEstadoPedido(id: number, EstadoPedido: Partial<EstadoPedido>): Promise<EstadoPedido> {
        await this.estadoPedidoRepository.update(id, EstadoPedido);
        return await this.buscarUnEstadoPedido(id);
    }

    async inactivarEstadoPedido(id: number) {
        let EstadoPedidoData = await this.estadoPedidoRepository.findOneBy({ id });
        EstadoPedidoData.activo = false;
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        EstadoPedidoData.fecha_actualizacion = new Date(fechaActual);
        return await this.actualizarEstadoPedido(id, EstadoPedidoData);
    }
}
