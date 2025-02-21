import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Pedido } from "./pedido.entity";

@Entity()
export class HistorialTransaccion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 45,
        nullable: false
    })
    tipo: string;

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

    @ManyToOne(() => Pedido, (pedido) => pedido.pedidoHistorialTransaccion, { eager: true, nullable: false })
    @JoinColumn({ name: 'pedido_id'})
    pedido: Pedido;
}