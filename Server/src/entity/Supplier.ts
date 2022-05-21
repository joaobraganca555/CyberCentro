import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { BillingAddress } from "./BillingAddress";

@Entity()
export class Supplier {
  @PrimaryColumn()
  supplierID: string;

  @Column()
  supplierTaxID: string;

  @Column()
  companyName: string;

  @ManyToOne(() => BillingAddress, (billingAddress) => billingAddress.supplier)
  billingAddress: BillingAddress;

  @Column()
  telephone: string;

  @Column()
  email: string;
}
