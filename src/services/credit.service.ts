import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credit } from 'src/models/credit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreditService {
    constructor(
        @InjectRepository(Credit)
        private readonly creditRepository: Repository<Credit>
    ) { }

    async findAllCredit(): Promise<Credit[]> {
        return await this.creditRepository.find();
    }

    async findOneCredit(id: number): Promise<Credit> {
        return await this.creditRepository.findOneBy({ id });
    }

    async createCredit(Credit: Partial<Credit>): Promise<Credit> {
        const newCredit = await this.creditRepository.create(Credit);
        return await this.creditRepository.save(newCredit);
    }

    async updateCredit(id: number, Credit: Partial<Credit>): Promise<Credit> {
        await this.creditRepository.update(id, Credit);
        return await this.findOneCredit(id);
    }

    async removeCredit(id: number) {
        let CreditData = await this.creditRepository.findOneBy({ id });
        CreditData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        CreditData.updated_at = new Date(nowDate);
        return await this.updateCredit(id, CreditData);
    }
}
