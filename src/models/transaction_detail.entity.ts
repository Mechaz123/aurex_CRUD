import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Transaction } from "./transaction.entity";
import { Product } from "./product.entity";

@Entity()
export class TransactionDetail {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    quantity: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    unit_price: number;

    @Column({
        nullable: false,
        default: true
    })
    active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Transaction, (transaction) => transaction.transactionDetails, { eager: true, nullable: false })
    @JoinColumn({ name: 'transaction_id' })
    transaction: Transaction;

    @ManyToOne(() => Product, (product) => product.productDetails, { eager: true, nullable: false })
    @JoinColumn({ name: 'product_id' })
    product: Product;
}