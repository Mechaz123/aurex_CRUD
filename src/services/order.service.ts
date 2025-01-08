import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/models/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) { }

    async findAllOrder(): Promise<Order[]> {
        return await this.orderRepository.find();
    }

    async findOneOrder(id: number): Promise<Order> {
        return await this.orderRepository.findOneBy({ id });
    }

    async createOrder(Order: Partial<Order>): Promise<Order> {
        const newOrder = await this.orderRepository.create(Order);
        return await this.orderRepository.save(newOrder);
    }

    async updateOrder(id: number, Order: Partial<Order>): Promise<Order> {
        await this.orderRepository.update(id, Order);
        return await this.findOneOrder(id);
    }
}