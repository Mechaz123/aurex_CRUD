import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";
import { ExchangeHistory } from "./exchange_history.entity";

@Entity()
export class Exchange {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.userRequestingExchanges, { eager: true, nullable: false })
    @JoinColumn({ name: 'requesting_user_id' })
    requesting_user: User;

    @ManyToOne(() => Product, (product) => product.productRequestingExchanges, { eager: true, nullable: false })
    @JoinColumn({ name: 'requesting_product_id' })
    requesting_product: Product;

    @Column({
        nullable: false,
    })
    quantity_requested: number;

    @ManyToOne(() => User, (user) => user.userReceivingExchanges, { eager: true, nullable: false })
    @JoinColumn({ name: 'receiving_user_id' })
    receiving_user: User;

    @ManyToOne(() => Product, (product) => product.productReceivingExchanges, { eager: true, nullable: false })
    @JoinColumn({ name: 'receiving_product_id' })
    receiving_product: Product;

    @Column({
        nullable: false,
    })
    quantity_receiving: number;

    @Column({
        nullable: false,
        default: true
    })
    active: boolean;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => ExchangeHistory, (exchangeHistory) => exchangeHistory.exchange)
    exchangeHistory: ExchangeHistory[];
}