import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity()
export class Credito {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Usuario, (usuario) => usuario.credito, { eager: true, nullable: false })
    @JoinColumn({ name: "propietario_id" })
    usuario: Usuario;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    monto: number;

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