import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from 'src/models/auction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuctionService {
    constructor(
        @InjectRepository(Auction)
        private readonly auctionRepository: Repository<Auction>
    ) { }

    async findAllAuction(): Promise<Auction[]> {
        return await this.auctionRepository.find();
    }

    async findOneAuction(id: number): Promise<Auction> {
        return await this.auctionRepository.findOneBy({ id });
    }

    async createAuction(Auction: Partial<Auction>): Promise<Auction> {
        const newAuction = await this.auctionRepository.create(Auction);
        return await this.auctionRepository.save(newAuction);
    }

    async updateAuction(id: number, Auction: Partial<Auction>): Promise<Auction> {
        await this.auctionRepository.update(id, Auction);
        return await this.findOneAuction(id);
    }
}
