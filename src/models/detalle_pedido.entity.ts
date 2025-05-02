import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Pedido } from "./pedido.entity";
import { Producto } from "./producto.entity";

@Entity()
export class DetallePedido {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    cantidad: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    precio_unitario: number;

    @Column({
        nullable: false,
        default: true
    })
    activo: boolean;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_actualizacion: Date;

    @ManyToOne(() => Pedido, (pedido) => pedido.detallePedidos, { eager: true, nullable: false })
    @JoinColumn({ name: 'pedido_id' })
    pedido: Pedido;

    @ManyToOne(() => Producto, (producto) => producto.productoDetallePedidos, { eager: true, nullable: false })
    @JoinColumn({ name: 'producto_id' })
    producto: Producto;
}