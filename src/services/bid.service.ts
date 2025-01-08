import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bid } from 'src/models/bid.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BidService {
    constructor(
        @InjectRepository(Bid)
        private readonly bidRepository: Repository<Bid>
    ) { }

    async findAllBid(): Promise<Bid[]> {
        return await this.bidRepository.find();
    }

    async findOneBid(id: number): Promise<Bid> {
        return await this.bidRepository.findOneBy({ id });
    }

    async createBid(Bid: Partial<Bid>): Promise<Bid> {
        const newBid = await this.bidRepository.create(Bid);
        return await this.bidRepository.save(newBid);
    }

    async updateBid(id: number, Bid: Partial<Bid>): Promise<Bid> {
        await this.bidRepository.update(id, Bid);
        return await this.findOneBid(id);
    }

    async removeBid(id: number) {
        let BidData = await this.bidRepository.findOneBy({ id });
        BidData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        BidData.updated_at = new Date(nowDate);
        return await this.updateBid(id, BidData);
    }
}
