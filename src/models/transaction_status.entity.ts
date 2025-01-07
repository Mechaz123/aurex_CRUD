import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity()
export class TransactionStatus {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 45,
        nullable: false
    })
    name: string;

    @Column({
        length: 255,
        nullable: true
    })
    description: string;

    @Column({
        nullable: false,
        default: true
    })
    active: boolean;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Transaction, (transaction) => transaction.transaction_status)
    transactions: Transaction[];
}