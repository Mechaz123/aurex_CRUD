import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Pedido } from "./pedido.entity";

@Entity()
export class CreditoBloqueado {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Pedido, (pedido) => pedido.creditoBloqueado, { eager: true, nullable: false })
    @JoinColumn({ name: "pedido_id" })
    pedido: Pedido;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    monto_bloqueado: number;

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