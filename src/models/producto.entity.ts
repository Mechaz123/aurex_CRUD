import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Categoria } from "./categoria.entity";
import { EstadoProducto } from "./estado_producto.entity";
import { Subasta } from "./subasta.entity";
import { DetallePedido } from "./detalle_pedido.entity";
import { Intercambio } from "./intercambio.entity";

@Entity()
export class Producto {

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
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    precio: number;

    @Column({
        nullable: false,
        default: 0
    })
    existencias: number;

    @Column({
        type:'mediumtext',
        nullable: true,
    })
    imagen_url: string;

    @Column({
        length: 45,
        nullable: false
    })
    destino: string;
    
    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_actualizacion: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.usuarioProductos, { eager: true, nullable: false })
    @JoinColumn({ name: 'propietario_id' })
    propietario: Usuario;

    @ManyToOne(() => Categoria, (categoria) => categoria.categoriaProductos, { eager: true, nullable: false })
    @JoinColumn({ name: 'categoria_id' })
    categoria: Categoria;

    @ManyToOne(() => EstadoProducto, { eager: true, nullable: false })
    @JoinColumn({ name: 'estado_producto_id' })
    estado_producto: EstadoProducto;

    @OneToMany(() => Subasta, (subasta) => subasta.producto)
    productosSubastados: Producto[];

    @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.producto)
    productoDetallePedidos: DetallePedido[];

    @OneToMany(() => Intercambio, (intercambio) => intercambio.producto_solicitante)
    productoSolicitanteIntercambios: Intercambio[];

    @OneToMany(() => Intercambio, (intercambio) => intercambio.producto_ofrecido)
    productoOfrecidoIntercambios: Intercambio[];
}