import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({unique: true, length: 50})
    username: string;

    @Column({unique: true})
    password: string;

}
