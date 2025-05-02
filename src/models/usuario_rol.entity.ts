import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Rol } from "./rol.entity";

@Entity()
export class UsuarioRol {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        default: true
    })
    activo: boolean;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_actualizacion: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.usuarioRoles, { eager: true, nullable: false })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @ManyToOne(() => Rol, (rol) => rol.usuarioRoles, { eager: true, nullable: false })
    @JoinColumn({ name: 'rol_id' })
    rol: Rol;
}