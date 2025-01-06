import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Category } from "./category.entity";
import { ProductStatus } from "./product_status.entity";

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

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ nullable: false, default: 0 })
    stock: number

    @Column({
        length: 255,
        nullable: true,
    })
    image_url: string;

    @Column({
        nullable: false,
        default: true
    })
    active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.userProducts, { eager: true, nullable: false })
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @ManyToOne(() => Category, (category) => category.categoryProducts, {eager: true, nullable: false })
    @JoinColumn({ name: 'category_id'})
    category: Category;

    @OneToOne(() => ProductStatus, { eager: true, cascade: true, nullable: false })
    @JoinColumn({ name: 'product_status_id'})
    product_status: ProductStatus;
}