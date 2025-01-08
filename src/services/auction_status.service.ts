import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuctionStatus } from 'src/models/auction_status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuctionStatusService {
    constructor(
        @InjectRepository(AuctionStatus)
        private readonly auctionStatusRepository: Repository<AuctionStatus>
    ) { }

    async findAllAuctionStatus(): Promise<AuctionStatus[]> {
        return await this.auctionStatusRepository.find();
    }

    async findOneAuctionStatus(id: number): Promise<AuctionStatus> {
        return await this.auctionStatusRepository.findOneBy({ id });
    }

    async createAuctionStatus(AuctionStatus: Partial<AuctionStatus>): Promise<AuctionStatus> {
        const newAuctionStatus = await this.auctionStatusRepository.create(AuctionStatus);
        return await this.auctionStatusRepository.save(newAuctionStatus);
    }

    async updateAuctionStatus(id: number, AuctionStatus: Partial<AuctionStatus>): Promise<AuctionStatus> {
        await this.auctionStatusRepository.update(id, AuctionStatus);
        return await this.findOneAuctionStatus(id);
    }

    async removeAuctionStatus(id: number) {
        let AuctionStatusData = await this.auctionStatusRepository.findOneBy({ id });
        AuctionStatusData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        AuctionStatusData.updated_at = new Date(nowDate);
        return await this.updateAuctionStatus(id, AuctionStatusData);
    }
}
