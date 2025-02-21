import { EstadoUsuario } from "./estado_usuario.entity"
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import * as bcrypt from "bcrypt";
import { UsuarioRol } from "./usuario_rol.entity";
import { Producto } from "./producto.entity";
import { Puja } from "./puja.entity";
import { Pedido } from "./pedido.entity";
import { Intercambio } from "./intercambio.entity";
import { Credito } from "./credito.entity";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 16,
        nullable: false,
        unique: true
    })
    nombre_usuario: string;

    @Column({
        length: 255,
        nullable: false,
        unique: true
    })
    correo: string;

    @Column({
        length: 255,
        nullable: false
    })
    clave: string;

    @Column({
        length: 45,
        nullable: false
    })
    nombre: string;

    @Column({
        length: 45,
        nullable: false
    })
    apellido: string;

    @Column({
        length: 255,
        nullable: false
    })
    direccion: string;

    @Column({
        length: 45,
        nullable: false
    })
    numero_contacto: string;

    @Column({
        length: 45,
        nullable: false
    })
    pais: string;

    @Column({
        length: 255,
        nullable: true,
    })
    imagen_url: string;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_actualizacion: Date;

    @ManyToOne(() => EstadoUsuario, { eager: true, nullable: false })
    @JoinColumn({ name: "estado_usuario_id" })
    estado_usuario: EstadoUsuario;

    @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.usuario)
    usuarioRoles: UsuarioRol[];

    @OneToMany(() => Producto, (producto) => producto.propietario)
    usuarioProductos: Producto[];

    @OneToMany(() => Puja, (puja) => puja.usuario)
    usuarioPujas: Puja[];

    @OneToMany(() => Pedido, (pedido) => pedido.usuario)
    usuarioPedidos: Pedido[];

    @OneToMany(() => Intercambio, (intercambio) => intercambio.usuario_solicitante)
    usuarioSolicitanteIntercambios: Intercambio[];

    @OneToMany(() => Intercambio, (intercambio) => intercambio.usuario_ofertante)
    usuarioOfertanteIntercambios: Intercambio[];

    @OneToOne(() => Credito, (credito) => credito.usuario)
    credito: Credito;

    @BeforeInsert()
    @BeforeUpdate()
    async hashClave() {
        if (this.clave) {
            const salt = await bcrypt.genSalt(10);
            this.clave = await bcrypt.hash(this.clave, salt);
        }
    }
}