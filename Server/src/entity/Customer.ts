import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { BillingAddress } from "./BillingAddress";
import { Invoice } from "./Invoice";

@Entity()
export class Customer {
  @PrimaryColumn()
  customerID: string;

  @Column()
  customerTaxID: string;

  @Column()
  companyName: string;

  @Column()
  telephone: string;

  @OneToOne(() => BillingAddress)
  @JoinColumn()
  billingAddress: BillingAddress;

  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoices:Invoice[];
}
