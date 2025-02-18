import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeHistory } from 'src/models/exchange_history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExchangeHistoryService {
    constructor(
        @InjectRepository(ExchangeHistory)
        private readonly exchangeHistoryRepository: Repository<ExchangeHistory>
    ) { }

    async findAllExchangeHistory(): Promise<ExchangeHistory[]> {
        return await this.exchangeHistoryRepository.find();
    }

    async findOneExchangeHistory(id: number): Promise<ExchangeHistory> {
        return await this.exchangeHistoryRepository.findOneBy({ id });
    }

    async createExchangeHistory(ExchangeHistory: Partial<ExchangeHistory>): Promise<ExchangeHistory> {
        const newExchangeHistory = await this.exchangeHistoryRepository.create(ExchangeHistory);
        return await this.exchangeHistoryRepository.save(newExchangeHistory);
    }

    async updateExchangeHistory(id: number, ExchangeHistory: Partial<ExchangeHistory>): Promise<ExchangeHistory> {
        await this.exchangeHistoryRepository.update(id, ExchangeHistory);
        return await this.findOneExchangeHistory(id);
    }

    async removeExchangeHistory(id: number) {
        let ExchangeHistoryData = await this.exchangeHistoryRepository.findOneBy({ id });
        ExchangeHistoryData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        ExchangeHistoryData.updated_at = new Date(nowDate);
        return await this.updateExchangeHistory(id, ExchangeHistoryData);
    }
}