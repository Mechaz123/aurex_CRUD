import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/models/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>
    ) { }

    async findAllTransaction(): Promise<Transaction[]> {
        return await this.transactionRepository.find();
    }

    async findOneTransaction(id: number): Promise<Transaction> {
        return await this.transactionRepository.findOneBy({ id });
    }

    async createTransaction(Transaction: Partial<Transaction>): Promise<Transaction> {
        const newTransaction = await this.transactionRepository.create(Transaction);
        return await this.transactionRepository.save(newTransaction);
    }

    async updateTransaction(id: number, Transaction: Partial<Transaction>): Promise<Transaction> {
        await this.transactionRepository.update(id, Transaction);
        return await this.findOneTransaction(id);
    }

    async removeTransaction(id: number) {
        let TransactionData = await this.transactionRepository.findOneBy({ id });
        TransactionData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        TransactionData.updated_at = new Date(nowDate);
        return await this.updateTransaction(id, TransactionData);
    }
}
