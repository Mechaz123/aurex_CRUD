import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { EstadoPedido } from "./estado_pedido.entity";
import { DetallePedido } from "./detalle_pedido.entity";
import { HistorialTransaccion } from "./historial_transaccion.entity";
import { CreditoBloqueado } from "./credito_bloqueado.entity";

@Entity()
export class Pedido {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    fecha_orden: Date;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    monto_total: number;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_actualizacion: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.usuarioPedidos, { eager: true, nullable: false })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @ManyToOne(() => EstadoPedido, { eager: true, nullable: false })
    @JoinColumn({ name: 'estado_pedido_id' })
    estado_pedido: EstadoPedido;

    @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.pedido)
    detallePedidos: DetallePedido[];

    @OneToMany(() => HistorialTransaccion, (historialTransaccion) => historialTransaccion.pedido)
    pedidoHistorialTransaccion: HistorialTransaccion[];

    @OneToOne(() => CreditoBloqueado, (creditoBloqueado) => creditoBloqueado.pedido)
    creditoBloqueado: CreditoBloqueado;
}