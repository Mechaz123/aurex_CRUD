import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetallePedido } from 'src/models/detalle_pedido.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetallePedidoService {
    constructor(
        @InjectRepository(DetallePedido)
        private readonly detallePedidoRepository: Repository<DetallePedido>
    ) { }

    async buscarTodosDetallePedidos(): Promise<DetallePedido[]> {
        return await this.detallePedidoRepository.find();
    }

    async buscarUnDetallePedido(id: number): Promise<DetallePedido> {
        return await this.detallePedidoRepository.findOneBy({ id });
    }

    async crearDetallePedido(DetallePedido: Partial<DetallePedido>): Promise<DetallePedido> {
        const nuevoDetallePedido = await this.detallePedidoRepository.create(DetallePedido);
        return await this.detallePedidoRepository.save(nuevoDetallePedido);
    }

    async actualizarDetallePedido(id: number, DetallePedido: Partial<DetallePedido>): Promise<DetallePedido> {
        await this.detallePedidoRepository.update(id, DetallePedido);
        return await this.buscarUnDetallePedido(id);
    }

    async inactivarDetallePedido(id: number) {
        let DetallePedidoData = await this.detallePedidoRepository.findOneBy({ id });
        DetallePedidoData.activo = false;
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        DetallePedidoData.fecha_actualizacion = new Date(fechaActual);
        return await this.actualizarDetallePedido(id, DetallePedidoData);
    }
}
