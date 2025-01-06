import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Category {

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
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Category, (category) => category.subcategories, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'parent_category_id' })
    parentCategory: Category;

    @OneToMany(() => Category, (category) => category.parentCategory)
    subcategories: Category[];

    @OneToMany(() => Product, (product) => product.category)
    categoryProducts: Product[];
}