import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditBlock } from 'src/models/credit_block.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreditBlockService {
    constructor(
        @InjectRepository(CreditBlock)
        private readonly creditBlockRepository: Repository<CreditBlock>
    ) { }

    async findAllCreditBlock(): Promise<CreditBlock[]> {
        return await this.creditBlockRepository.find();
    }

    async findOneCreditBlock(id: number): Promise<CreditBlock> {
        return await this.creditBlockRepository.findOneBy({ id });
    }

    async createCreditBlock(CreditBlock: Partial<CreditBlock>): Promise<CreditBlock> {
        const newCreditBlock = await this.creditBlockRepository.create(CreditBlock);
        return await this.creditBlockRepository.save(newCreditBlock);
    }

    async updateCreditBlock(id: number, CreditBlock: Partial<CreditBlock>): Promise<CreditBlock> {
        await this.creditBlockRepository.update(id, CreditBlock);
        return await this.findOneCreditBlock(id);
    }

    async removeCreditBlock(id: number) {
        let CreditBlockData = await this.creditBlockRepository.findOneBy({ id });
        CreditBlockData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        CreditBlockData.updated_at = new Date(nowDate);
        return await this.updateCreditBlock(id, CreditBlockData);
    }
}
