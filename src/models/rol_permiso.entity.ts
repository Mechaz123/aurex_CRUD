import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Rol } from "./rol.entity";
import { Permiso } from "./permiso.entity";

@Entity()
export class RolPermiso {

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

    @ManyToOne(() => Rol, (rol) => rol.rolPermisos, { eager: true, nullable: false })
    @JoinColumn({ name: 'rol_id' })
    rol: Rol;

    @ManyToOne(() => Permiso, (permiso) => permiso.rolPermisos, { eager: true, nullable: false })
    @JoinColumn({ name: 'permiso_id' })
    permiso: Permiso;
}