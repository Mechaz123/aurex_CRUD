import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Subasta } from "./subasta.entity";
import { Usuario } from "./usuario.entity";

@Entity()

export class Puja {

    @PrimaryGeneratedColumn()
    id: number;

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

    @ManyToOne(() => Subasta, (subasta) => subasta.subastaPujas, { eager: true, nullable: false })
    @JoinColumn({ name: 'subasta_id' })
    subasta: Subasta;

    @ManyToOne(() => Usuario, (usuario) => usuario.usuarioPujas, { eager: true, nullable: false })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;
}