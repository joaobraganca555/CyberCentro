import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Header{
    @PrimaryColumn()
    auditFileVersion: string

    @Column()
    companyName: string

    @Column()
    fiscalYear: string

    @Column()
    startDate: string

    @Column()
    finishDate: string
}