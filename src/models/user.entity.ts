import { UserStatus } from "./user_status.entity"
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import * as bcrypt from "bcrypt";
import { UserRole } from "./user_role.entity";
import { Product } from "./product.entity";
import { Bid } from "./bid.entity";
import { Order } from "./order.entity";
import { Exchange } from "./exchange.entity";
import { Credit } from "./credit.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 16,
        nullable: false,
        unique: true
    })
    username: string;

    @Column({
        length: 255,
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        length: 255,
        nullable: false
    })
    password: string;

    @Column({
        length: 45,
        nullable: false
    })
    first_name: string;

    @Column({
        length: 45,
        nullable: false
    })
    last_name: string;

    @Column({
        length: 255,
        nullable: false
    })
    address: string;

    @Column({
        length: 45,
        nullable: false
    })
    phone: string;

    @Column({
        length: 45,
        nullable: false
    })
    country: string;

    @Column({
        length: 255,
        nullable: true,
    })
    image_url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => UserStatus, { eager: true, nullable: false })
    @JoinColumn({ name: "user_status_id" })
    user_status: UserStatus;

    @OneToMany(() => UserRole, (userRole) => userRole.user)
    userRoles: UserRole[];

    @OneToMany(() => Product, (product) => product.owner)
    userProducts: Product[];

    @OneToMany(() => Bid, (bid) => bid.user)
    userBids: Bid[];

    @OneToMany(() => Order, (order) => order.user)
    userOrders: Order[];

    @OneToMany(() => Exchange, (exchange) => exchange.requesting_user)
    userRequestingExchanges: Exchange[];

    @OneToMany(() => Exchange, (exchange) => exchange.receiving_user)
    userReceivingExchanges: Exchange[];

    @OneToOne(() => Credit, (credit) => credit.user)
    credit: Credit;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
}