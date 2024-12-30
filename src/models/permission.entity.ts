import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 45,
        nullable: false
    })
    name: string

    @Column({
        length: 255
    })
    description: string

    @Column({
        length: 45,
        nullable: false
    })
    resource: string

    @Column({
        length: 45,
        nullable: false
    })
    action: string
}