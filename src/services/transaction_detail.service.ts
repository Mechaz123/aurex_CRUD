import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionDetail } from 'src/models/transaction_detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionDetailService {
    constructor(
        @InjectRepository(TransactionDetail)
        private readonly transactionDetailRepository: Repository<TransactionDetail>
    ) { }

    async findAllTransactionDetail(): Promise<TransactionDetail[]> {
        return await this.transactionDetailRepository.find();
    }

    async findOneTransactionDetail(id: number): Promise<TransactionDetail> {
        return await this.transactionDetailRepository.findOneBy({ id });
    }

    async createTransactionDetail(TransactionDetail: Partial<TransactionDetail>): Promise<TransactionDetail> {
        const newTransactionDetail = await this.transactionDetailRepository.create(TransactionDetail);
        return await this.transactionDetailRepository.save(newTransactionDetail);
    }

    async updateTransactionDetail(id: number, TransactionDetail: Partial<TransactionDetail>): Promise<TransactionDetail> {
        await this.transactionDetailRepository.update(id, TransactionDetail);
        return await this.findOneTransactionDetail(id);
    }

    async removeTransactionDetail(id: number) {
        let TransactionDetailData = await this.transactionDetailRepository.findOneBy({ id });
        TransactionDetailData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        TransactionDetailData.updated_at = new Date(nowDate);
        return await this.updateTransactionDetail(id, TransactionDetailData);
    }
}
