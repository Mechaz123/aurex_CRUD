import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Producto } from "./producto.entity";

@Entity()
export class Categoria {

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

    @ManyToOne(() => Categoria, (categoria) => categoria.subcategorias, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'categoria_principal_id' })
    categoria_principal: Categoria;

    @OneToMany(() => Categoria, (categoria) => categoria.categoria_principal)
    subcategorias: Categoria[];

    @OneToMany(() => Producto, (producto) => producto.categoria)
    categoriaProductos: Producto[];
}