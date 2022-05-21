import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Invoice } from "./Invoice";
import { Product } from "./Product";

@Entity()
export class InvoiceLine {
  @PrimaryColumn()
  lineNumber: string;
  
  @ManyToOne(() => Product, (product) => product.productCode)
  product: Product;

  @Column()
  quantity: string;

  @Column()
  unitOfMeasure: string;

  @Column()
  unitPrice: string;

  @Column()
  taxBase: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceLines)
  invoice: Invoice;
}
