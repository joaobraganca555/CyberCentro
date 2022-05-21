import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { InvoiceLine } from "./InvoiceLine";

@Entity()
export class Product{
    @PrimaryColumn()
    productCode: string;

    @Column()
    productType: string;

    @Column()
    productGroup: string;

    @Column()
    productDescription: string;

    @OneToMany(() => InvoiceLine, (invoiceLine) => invoiceLine.product)
    invoiceLines:InvoiceLine[];
}