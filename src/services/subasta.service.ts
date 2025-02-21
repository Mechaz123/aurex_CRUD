import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subasta } from 'src/models/subasta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubastaService {
    constructor(
        @InjectRepository(Subasta)
        private readonly subastaRepository: Repository<Subasta>
    ) { }

    async buscarTodosSubasta(): Promise<Subasta[]> {
        return await this.subastaRepository.find();
    }

    async buscarUnaSubasta(id: number): Promise<Subasta> {
        return await this.subastaRepository.findOneBy({ id });
    }

    async crearSubasta(Subasta: Partial<Subasta>): Promise<Subasta> {
        const nuevaSubasta = await this.subastaRepository.create(Subasta);
        return await this.subastaRepository.save(nuevaSubasta);
    }

    async actualizarSubasta(id: number, Subasta: Partial<Subasta>): Promise<Subasta> {
        await this.subastaRepository.update(id, Subasta);
        return await this.buscarUnaSubasta(id);
    }
}
