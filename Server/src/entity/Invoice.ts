import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { InvoiceLine } from "./InvoiceLine";

@Entity()
export class Invoice {
  @PrimaryColumn()
  invoiceNo: string;

  @Column()
  invoiceStatus: string;

  @Column()
  invoiceDate: string;

  @Column()
  invoiceType: string;

  @Column()
  grossTotal: string;

  @Column()
  paymentMechanism: string;

  @Column()
  paymentDate: string;

  @OneToMany(() => InvoiceLine, (invoiceLine) => invoiceLine.invoice)
  invoiceLines: InvoiceLine[];
}
