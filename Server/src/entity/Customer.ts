import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { BillingAddress } from "./BillingAddress";

@Entity()
export class Customer {
  @PrimaryColumn()
  customerID: string;

  @Column()
  customerTaxID: string;

  @Column()
  companyName: string;

  @ManyToOne(() => BillingAddress, (billingAddress) => billingAddress.customer)
  billingAddress: BillingAddress;

  @Column()
  telephone: string;

  @Column()
  email: string;
}
