import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Credit {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user) => user.credit, { eager: true, nullable: false })
    @JoinColumn({ name: "owner_id" })
    user: User;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    amount: number;

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