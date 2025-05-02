import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from 'src/models/pedido.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PedidoService {
    constructor(
        @InjectRepository(Pedido)
        private readonly pedidoRepository: Repository<Pedido>
    ) { }

    async buscarTodosPedidos(): Promise<Pedido[]> {
        return await this.pedidoRepository.find();
    }

    async buscarUnPedido(id: number): Promise<Pedido> {
        return await this.pedidoRepository.findOneBy({ id });
    }

    async crearPedido(Pedido: Partial<Pedido>): Promise<Pedido> {
        const nuevoPedido = await this.pedidoRepository.create(Pedido);
        return await this.pedidoRepository.save(nuevoPedido);
    }

    async actualizarPedido(id: number, Pedido: Partial<Pedido>): Promise<Pedido> {
        await this.pedidoRepository.update(id, Pedido);
        return await this.buscarUnPedido(id);
    }
}