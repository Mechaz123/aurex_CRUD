import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class EstadoIntercambio {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 45,
        nullable: false
    })
    nombre: string;

    @Column({
        length: 255,
        nullable: true
    })
    descripcion: string;

    @Column({
        nullable: false,
        default: true
    })
    activo: boolean;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_actualizacion: Date;
}