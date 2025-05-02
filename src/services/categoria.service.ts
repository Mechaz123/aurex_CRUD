import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from 'src/models/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>
    ) { }

    async buscarTodasCategorias(): Promise<Categoria[]> {
        return await this.categoriaRepository.find({ relations: ['categoria_principal'] });
    }

    async buscarUnaCategoria(id: number): Promise<Categoria> {
        return await this.categoriaRepository.findOne({ where: { id }, relations: ['categoria_principal'] });
    }

    async crearCategoria(Categoria: Partial<Categoria>): Promise<Categoria> {
        const nuevaCategoria = await this.categoriaRepository.create(Categoria);
        return await this.categoriaRepository.save(nuevaCategoria);
    }

    async actualizarCategoria(id: number, Categoria: Partial<Categoria>): Promise<Categoria> {
        await this.categoriaRepository.update(id, Categoria);
        return await this.buscarUnaCategoria(id);
    }

    async inactivarCategoria(id: number) {
        let CategoriaData = await this.buscarUnaCategoria(id);
        CategoriaData.activo = false;
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        CategoriaData.fecha_actualizacion = new Date(fechaActual);
        return await this.actualizarCategoria(id, CategoriaData);
    }
}
