import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { OrderStatus } from "./order_status.entity";
import { OrderDetail } from "./order_detail.entity";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    order_date: Date;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    total_amount: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.userOrders, { eager: true, nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => OrderStatus, { eager: true, nullable: false })
    @JoinColumn({ name: 'order_status_id' })
    order_status: OrderStatus;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
    orderDetails: OrderDetail[];
}