import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionStatus } from 'src/models/transaction_status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionStatusService {
    constructor(
        @InjectRepository(TransactionStatus)
        private readonly transactionStatusRepository: Repository<TransactionStatus>
    ) { }

    async findAllTransactionStatus(): Promise<TransactionStatus[]> {
        return await this.transactionStatusRepository.find();
    }

    async findOneTransactionStatus(id: number): Promise<TransactionStatus> {
        return await this.transactionStatusRepository.findOneBy({ id });
    }

    async createTransactionStatus(TransactionStatus: Partial<TransactionStatus>): Promise<TransactionStatus> {
        const newTransactionStatus = await this.transactionStatusRepository.create(TransactionStatus);
        return await this.transactionStatusRepository.save(newTransactionStatus);
    }

    async updateTransactionStatus(id: number, TransactionStatus: Partial<TransactionStatus>): Promise<TransactionStatus> {
        await this.transactionStatusRepository.update(id, TransactionStatus);
        return await this.findOneTransactionStatus(id);
    }

    async removeTransactionStatus(id: number) {
        let TransactionStatusData = await this.transactionStatusRepository.findOneBy({ id });
        TransactionStatusData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        TransactionStatusData.updated_at = new Date(nowDate);
        return await this.updateTransactionStatus(id, TransactionStatusData);
    }
}
