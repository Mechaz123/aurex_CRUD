import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exchange } from 'src/models/exchange.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExchangeService {
    constructor(
        @InjectRepository(Exchange)
        private readonly exchangeRepository: Repository<Exchange>
    ) { }

    async findAllExchange(): Promise<Exchange[]> {
        return await this.exchangeRepository.find();
    }

    async findOneExchange(id: number): Promise<Exchange> {
        return await this.exchangeRepository.findOneBy({ id });
    }

    async createExchange(Exchange: Partial<Exchange>): Promise<Exchange> {
        const newExchange = await this.exchangeRepository.create(Exchange);
        return await this.exchangeRepository.save(newExchange);
    }

    async updateExchange(id: number, Exchange: Partial<Exchange>): Promise<Exchange> {
        await this.exchangeRepository.update(id, Exchange);
        return await this.findOneExchange(id);
    }

    async removeExchange(id: number) {
        let ExchangeData = await this.exchangeRepository.findOneBy({ id });
        ExchangeData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        ExchangeData.updated_at = new Date(nowDate);
        return await this.updateExchange(id, ExchangeData);
    }
}
