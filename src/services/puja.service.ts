import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Puja } from 'src/models/puja.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PujaService {
    constructor(
        @InjectRepository(Puja)
        private readonly pujaRepository: Repository<Puja>
    ) { }

    async buscarTodasPujas(): Promise<Puja[]> {
        return await this.pujaRepository.find();
    }

    async buscarUnaPuja(id: number): Promise<Puja> {
        return await this.pujaRepository.findOneBy({ id });
    }

    async crearPuja(Puja: Partial<Puja>): Promise<Puja> {
        const nuevaPuja = await this.pujaRepository.create(Puja);
        return await this.pujaRepository.save(nuevaPuja);
    }

    async actualizarPuja(id: number, Puja: Partial<Puja>): Promise<Puja> {
        await this.pujaRepository.update(id, Puja);
        return await this.buscarUnaPuja(id);
    }

    async inactivarPuja(id: number) {
        let PujaData = await this.pujaRepository.findOneBy({ id });
        PujaData.activo = false;
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        PujaData.fecha_actualizacion = new Date(fechaActual);
        return await this.actualizarPuja(id, PujaData);
    }
}
