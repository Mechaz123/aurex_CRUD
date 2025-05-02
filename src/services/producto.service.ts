import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/models/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>
    ) { }

    async buscarTodosProductos(): Promise<Producto[]> {
        return await this.productoRepository.find({ relations: ['categoria', 'categoria.categoria_principal'] });
    }

    async buscarUnProducto(id: number): Promise<Producto> {
        return await this.productoRepository.findOne({ where: { id }, relations: ['categoria', 'categoria.categoria_principal'] });
    }

    async crearProducto(Producto: Partial<Producto>): Promise<Producto> {
        const nuevoProducto = await this.productoRepository.create(Producto);
        return await this.productoRepository.save(nuevoProducto);
    }

    async actualizarProducto(id: number, Producto: Partial<Producto>): Promise<Producto> {
        await this.productoRepository.update(id, Producto);
        return await this.buscarUnProducto(id);
    }
}
