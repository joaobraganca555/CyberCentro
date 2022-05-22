import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Invoice } from "./Invoice";
import { Product } from "./Product";

@Entity()
export class InvoiceLine {
  @PrimaryGeneratedColumn()
  lineNumber: number;
  
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
