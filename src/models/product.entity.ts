import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Category } from "./category.entity";
import { ProductStatus } from "./product_status.entity";
import { TransactionDetail } from "./transaction_detail.entity";
import { Auction } from "./auction.entity";
import { OrderDetail } from "./order_detail.entity";

@Entity()
export class Product {

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
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number;

    @Column({
        nullable: false,
        default: 0
    })
    stock: number

    @Column({
        length: 255,
        nullable: true,
    })
    image_url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.userProducts, { eager: true, nullable: false })
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @ManyToOne(() => Category, (category) => category.categoryProducts, { eager: true, nullable: false })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @ManyToOne(() => ProductStatus, { eager: true, nullable: false })
    @JoinColumn({ name: 'product_status_id' })
    product_status: ProductStatus;

    @OneToMany(() => TransactionDetail, (transactionDetail) => transactionDetail.product)
    productDetails: TransactionDetail[];

    @OneToMany(() => Auction, (auction) => auction.product)
    productAuctions: Product[];

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
    productOrderDetails: OrderDetail[];
}