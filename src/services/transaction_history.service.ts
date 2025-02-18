import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionHistory } from 'src/models/transaction_history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionHistoryService {
    constructor(
        @InjectRepository(TransactionHistory)
        private readonly transactionHistoryRepository: Repository<TransactionHistory>
    ) { }

    async findAllTransactionHistory(): Promise<TransactionHistory[]> {
        return await this.transactionHistoryRepository.find();
    }

    async findOneTransactionHistory(id: number): Promise<TransactionHistory> {
        return await this.transactionHistoryRepository.findOneBy({ id });
    }

    async createTransactionHistory(TransactionHistory: Partial<TransactionHistory>): Promise<TransactionHistory> {
        const newTransactionHistory = await this.transactionHistoryRepository.create(TransactionHistory);
        return await this.transactionHistoryRepository.save(newTransactionHistory);
    }

    async updateTransactionHistory(id: number, TransactionHistory: Partial<TransactionHistory>): Promise<TransactionHistory> {
        await this.transactionHistoryRepository.update(id, TransactionHistory);
        return await this.findOneTransactionHistory(id);
    }

    async removeTransactionHistory(id: number) {
        let TransactionHistoryData = await this.transactionHistoryRepository.findOneBy({ id });
        TransactionHistoryData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        TransactionHistoryData.updated_at = new Date(nowDate);
        return await this.updateTransactionHistory(id, TransactionHistoryData);
    }
}
