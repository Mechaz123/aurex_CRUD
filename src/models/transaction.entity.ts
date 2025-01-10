import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { TransactionStatus } from "./transaction_status.entity";
import { TransactionDetail } from "./transaction_detail.entity";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 45,
        nullable: false
    })
    transaction_type: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.userSenders, { eager: true, nullable: false })
    @JoinColumn({ name: 'sender_id' })
    sender: User;

    @ManyToOne(() => User, (user) => user.userReceivers, { eager: true, nullable: false })
    @JoinColumn({ name: 'receiver_id' })
    receiver: User;

    @ManyToOne(() => TransactionStatus, { eager: true, nullable: false })
    @JoinColumn({ name: "transaction_status_id" })
    transaction_status: TransactionStatus;

    @OneToMany(() => TransactionDetail, (transactionDetail) => transactionDetail.transaction)
    transactionDetails: TransactionDetail[];
}