import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Intercambio } from "./intercambio.entity";
import { EstadoIntercambio } from "./estado_intercambio.entity";

@Entity()
export class HistorialIntercambio {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Intercambio, (intercambio) => intercambio.historialIntercambios, { eager: true, nullable: false })
    @JoinColumn({ name: 'intercambio_id' })
    intercambio: Intercambio;

    @ManyToOne(() => EstadoIntercambio, { eager: true, nullable: false })
    @JoinColumn({ name: "estado_anterior_id" })
    estado_anterior: EstadoIntercambio;

    @ManyToOne(() => EstadoIntercambio, { eager: true, nullable: false })
    @JoinColumn({ name: "estado_nuevo_id" })
    nuevo_estado: EstadoIntercambio;

    @Column({
        nullable: false,
        default: true
    })
    activo: boolean;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_actualizacion: Date;
}