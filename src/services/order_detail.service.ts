import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from 'src/models/order_detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailService {
    constructor(
        @InjectRepository(OrderDetail)
        private readonly orderDetailRepository: Repository<OrderDetail>
    ) { }

    async findAllOrderDetail(): Promise<OrderDetail[]> {
        return await this.orderDetailRepository.find();
    }

    async findOneOrderDetail(id: number): Promise<OrderDetail> {
        return await this.orderDetailRepository.findOneBy({ id });
    }

    async createOrderDetail(OrderDetail: Partial<OrderDetail>): Promise<OrderDetail> {
        const newOrderDetail = await this.orderDetailRepository.create(OrderDetail);
        return await this.orderDetailRepository.save(newOrderDetail);
    }

    async updateOrderDetail(id: number, OrderDetail: Partial<OrderDetail>): Promise<OrderDetail> {
        await this.orderDetailRepository.update(id, OrderDetail);
        return await this.findOneOrderDetail(id);
    }

    async removeOrderDetail(id: number) {
        let OrderDetailData = await this.orderDetailRepository.findOneBy({ id });
        OrderDetailData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        OrderDetailData.updated_at = new Date(nowDate);
        return await this.updateOrderDetail(id, OrderDetailData);
    }
}
