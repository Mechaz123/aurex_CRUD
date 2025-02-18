import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";
import { AuctionStatus } from "./auction_status.entity";
import { Bid } from "./bid.entity";

@Entity()
export class Auction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    initial_price: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    current_price: number;

    @Column({
        type: 'timestamp',
        nullable: false
    })
    start_date: Date;

    @Column({
        type: 'timestamp',
        nullable: false
    })
    end_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Product, (product) => product.productAuctions, { eager: true, nullable: false })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => AuctionStatus, { eager: true, nullable: false })
    @JoinColumn({ name: 'auction_status_id' })
    auction_status: AuctionStatus;

    @OneToMany(() => Bid, (bid) => bid.auction)
    auctionBids: Bid[];
}