import { UserStatus } from "./user_status.entity"
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import * as bcrypt from "bcrypt";
import { UserRole } from "./user_role.entity";

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
    create_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => UserStatus, { eager: true, cascade: true, nullable: false })
    @JoinColumn()
    user_status: UserStatus;

    @OneToMany(() => UserRole, (userRole) => userRole.user)
    userRoles: UserRole[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
}