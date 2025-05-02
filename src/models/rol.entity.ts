import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { UsuarioRol } from "./usuario_rol.entity";
import { RolPermiso } from "./rol_permiso.entity";

@Entity()
export class Rol {

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

    @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.rol)
    usuarioRoles: UsuarioRol[];

    @OneToMany(() => RolPermiso, (rolPermiso) => rolPermiso.rol)
    rolPermisos: RolPermiso[];
}