import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 45,
        nullable: false
    })
    name: string

    @Column({
        length:255
    })
    description: string

    @CreateDateColumn()
    created_at: Date
}