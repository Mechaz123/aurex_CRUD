import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class UserStatus {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 45,
        nullable: false
    })
    name: string

    @Column({
        length:255,
        nullable: true
    })
    description: string

    @OneToOne(() => User, (user) => user.user_status)
    user: User;
}