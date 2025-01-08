import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from 'src/models/order_status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderStatusService {
    constructor(
        @InjectRepository(OrderStatus)
        private readonly orderStatusRepository: Repository<OrderStatus>
    ) { }

    async findAllOrderStatus(): Promise<OrderStatus[]> {
        return await this.orderStatusRepository.find();
    }

    async findOneOrderStatus(id: number): Promise<OrderStatus> {
        return await this.orderStatusRepository.findOneBy({ id });
    }

    async createOrderStatus(OrderStatus: Partial<OrderStatus>): Promise<OrderStatus> {
        const newOrderStatus = await this.orderStatusRepository.create(OrderStatus);
        return await this.orderStatusRepository.save(newOrderStatus);
    }

    async updateOrderStatus(id: number, OrderStatus: Partial<OrderStatus>): Promise<OrderStatus> {
        await this.orderStatusRepository.update(id, OrderStatus);
        return await this.findOneOrderStatus(id);
    }

    async removeOrderStatus(id: number) {
        let OrderStatusData = await this.orderStatusRepository.findOneBy({ id });
        OrderStatusData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        OrderStatusData.updated_at = new Date(nowDate);
        return await this.updateOrderStatus(id, OrderStatusData);
    }
}
