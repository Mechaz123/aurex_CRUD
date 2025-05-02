import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Producto } from "./producto.entity";
import { EstadoSubasta } from "./estado_subasta.entity";
import { Puja } from "./puja.entity";

@Entity()
export class Subasta {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    precio_inicial: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    precio_actual: number;

    @Column({
        type: 'timestamp',
        nullable: false
    })
    fecha_inicio: Date;

    @Column({
        type: 'timestamp',
        nullable: false
    })
    fecha_fin: Date;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_actualizacion: Date;

    @ManyToOne(() => Producto, (producto) => producto.productosSubastados, { eager: true, nullable: false })
    @JoinColumn({ name: 'producto_id' })
    producto: Producto;

    @ManyToOne(() => EstadoSubasta, { eager: true, nullable: false })
    @JoinColumn({ name: 'estado_subasta_id' })
    estado_subasta: EstadoSubasta;

    @OneToMany(() => Puja, (puja) => puja.subasta)
    subastaPujas: Puja[];
}