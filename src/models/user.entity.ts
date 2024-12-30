import { UserStatus } from "./user_status.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

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
    password_hash: string;

    @Column({
        length: 45
    })
    first_name: string;

    @Column({
        length: 45
    })
    last_name: string;

    @Column({
        length: 255
    })
    address: string;

    @Column({
        length: 45
    })
    phone: string;

    @Column({
        length: 45
    })
    country: string;

    @Column({
        length: 255
    })
    image_url: string;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => UserStatus, {eager: true, cascade: true})
    @JoinColumn()
    user_status: UserStatus;
}