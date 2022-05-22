import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { BillingAddress } from "./BillingAddress";

@Entity()
export class Supplier {
  @PrimaryColumn()
  supplierID: string;

  @Column()
  supplierTaxID: string;

  @Column()
  companyName: string;

  @Column()
  telephone: string;

  @OneToOne(() => BillingAddress)
  @JoinColumn()
  billingAddress: BillingAddress;
}
