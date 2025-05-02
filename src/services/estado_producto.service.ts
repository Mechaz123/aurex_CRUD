import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoProducto } from 'src/models/estado_producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadoProductoService {
    constructor(
        @InjectRepository(EstadoProducto)
        private readonly estadoProductoRepository: Repository<EstadoProducto>
    ) { }

    async buscarTodosEstadosProducto(): Promise<EstadoProducto[]> {
        return await this.estadoProductoRepository.find();
    }

    async buscarUnEstadoProducto(id: number): Promise<EstadoProducto> {
        return await this.estadoProductoRepository.findOneBy({ id });
    }

    async crearEstadoProducto(EstadoProducto: Partial<EstadoProducto>): Promise<EstadoProducto> {
        const nuevoEstadoProducto = await this.estadoProductoRepository.create(EstadoProducto);
        return await this.estadoProductoRepository.save(nuevoEstadoProducto);
    }

    async actualizarEstadoProducto(id: number, EstadoProducto: Partial<EstadoProducto>): Promise<EstadoProducto> {
        await this.estadoProductoRepository.update(id, EstadoProducto);
        return await this.buscarUnEstadoProducto(id);
    }

    async inactivarEstadoProducto(id: number) {
        let EstadoProductoData = await this.estadoProductoRepository.findOneBy({ id });
        EstadoProductoData.activo = false;
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        EstadoProductoData.fecha_actualizacion = new Date(fechaActual);
        return await this.actualizarEstadoProducto(id, EstadoProductoData);
    }
}
