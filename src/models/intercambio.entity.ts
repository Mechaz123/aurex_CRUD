import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Producto } from "./producto.entity";
import { HistorialIntercambio } from "./historial_intercambio.entity";

@Entity()
export class Intercambio {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.usuarioSolicitanteIntercambios, { eager: true, nullable: false })
    @JoinColumn({ name: 'usuario_solicitante_id' })
    usuario_solicitante: Usuario;

    @ManyToOne(() => Producto, (producto) => producto.productoSolicitanteIntercambios, { eager: true, nullable: false })
    @JoinColumn({ name: 'producto_solicitante_id' })
    producto_solicitante: Producto;

    @Column({
        nullable: false,
    })
    cantidad_solicitada: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.usuarioOfertanteIntercambios, { eager: true, nullable: false })
    @JoinColumn({ name: 'usuario_ofertante_id' })
    usuario_ofertante: Usuario;

    @ManyToOne(() => Producto, (producto) => producto.productoOfrecidoIntercambios, { eager: true, nullable: false })
    @JoinColumn({ name: 'producto_ofrecido_id' })
    producto_ofrecido: Producto;

    @Column({
        nullable: false,
    })
    cantidad_ofrecida: number;

    @Column({
        nullable: false,
        default: true
    })
    activo: boolean;

    @CreateDateColumn()
    fecha_creacion: Date;
    
    @UpdateDateColumn()
    fecha_actualizacion: Date;

    @OneToMany(() => HistorialIntercambio, (historialIntercambio) => historialIntercambio.intercambio)
    historialIntercambios: HistorialIntercambio[];
}