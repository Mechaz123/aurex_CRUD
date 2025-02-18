import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeStatus } from 'src/models/exchange_status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExchangeStatusService {
    constructor(
        @InjectRepository(ExchangeStatus)
        private readonly exchangeStatusRepository: Repository<ExchangeStatus>
    ) { }

    async findAllExchangeStatus(): Promise<ExchangeStatus[]> {
        return await this.exchangeStatusRepository.find();
    }

    async findOneExchangeStatus(id: number): Promise<ExchangeStatus> {
        return await this.exchangeStatusRepository.findOneBy({ id });
    }

    async createExchangeStatus(ExchangeStatus: Partial<ExchangeStatus>): Promise<ExchangeStatus> {
        const newExchangeStatus = await this.exchangeStatusRepository.create(ExchangeStatus);
        return await this.exchangeStatusRepository.save(newExchangeStatus);
    }

    async updateExchangeStatus(id: number, ExchangeStatus: Partial<ExchangeStatus>): Promise<ExchangeStatus> {
        await this.exchangeStatusRepository.update(id, ExchangeStatus);
        return await this.findOneExchangeStatus(id);
    }

    async removeExchangeStatus(id: number) {
        let ExchangeStatusData = await this.exchangeStatusRepository.findOneBy({ id });
        ExchangeStatusData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        ExchangeStatusData.updated_at = new Date(nowDate);
        return await this.updateExchangeStatus(id, ExchangeStatusData);
    }
}
