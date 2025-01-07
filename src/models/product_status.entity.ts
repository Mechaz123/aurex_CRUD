import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductStatus {

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

    @OneToMany(() => Product, (product) => product.product_status)
    product: Product;
}