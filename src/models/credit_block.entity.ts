import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class CreditBlock {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Order, (order) => order.creditBlock, { eager: true, nullable: false })
    @JoinColumn({ name: "order_id" })
    order: Order;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    blocked_amount: number;

    @Column({
        nullable: false,
        default: true
    })
    active: boolean;
    
    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
}