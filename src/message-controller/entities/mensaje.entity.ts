import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Mensaje')
export class Mensaje {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nick: string;

    @Column()
    value: string;

}
