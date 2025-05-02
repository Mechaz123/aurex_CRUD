import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { RolPermiso } from "./rol_permiso.entity";

@Entity()
export class Permiso {
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
        length: 45,
        nullable: false
    })
    recurso: string;

    @Column({
        length: 45,
        nullable: false
    })
    accion: string;

    @Column({
        nullable: false,
        default: true
    })
    activo: boolean;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_actualizacion: Date;

    @OneToMany(() => RolPermiso, (rolPermiso) => rolPermiso.permiso)
    rolPermisos: RolPermiso[];
}