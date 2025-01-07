import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./role.entity";
import { Permission } from "./permission.entity";

@Entity()
export class RolePermission {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        default: true
    })
    active: boolean;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Role, (role) => role.rolePermissions, { eager: true, nullable: false })
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @ManyToOne(() => Permission, (permission) => permission.rolePermissions, { eager: true, nullable: false })
    @JoinColumn({ name: 'permission_id' })
    permission: Permission;
}