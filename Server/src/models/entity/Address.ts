import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    AddressID: number;

    @Column({ type: "varchar", length: 200 })
    StreetName: string;

    @Column({ type: "varchar", length: 50 })
    City: string;

    @Column({ type: "varchar", length: 20 })
    PostalCode: string;

    @Column({ type: "varchar", length: 50 })
    Region: string;

    @Column({ type: "varchar", length: 12 })
    Country: string;
}