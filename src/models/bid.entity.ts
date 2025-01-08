import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Auction } from "./auction.entity";
import { User } from "./user.entity";

@Entity()

export class Bid {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    amount: number;

    @CreateDateColumn()
    bid_date: Date;

    @Column({
        nullable: false,
        default: true
    })
    active: boolean;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Auction, (auction) => auction.auctionBids, { eager: true, nullable: false })
    @JoinColumn({ name: 'auction_id' })
    auction: Auction;

    @ManyToOne(() => User, (user) => user.userBids, { eager: true, nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;
}