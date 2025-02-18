import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exchange } from "./exchange.entity";
import { ExchangeStatus } from "./exchange_status.entity";

@Entity()
export class ExchangeHistory {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Exchange, (exchange) => exchange.exchangeHistory, { eager: true, nullable: false })
    @JoinColumn({ name: 'exchange_id' })
    exchange: Exchange;

    @ManyToOne(() => ExchangeStatus, { eager: true, nullable: false })
    @JoinColumn({ name: "previous_status_id" })
    previous_status: ExchangeStatus;

    @ManyToOne(() => ExchangeStatus, { eager: true, nullable: false })
    @JoinColumn({ name: "new_status_id" })
    new_status: ExchangeStatus;

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