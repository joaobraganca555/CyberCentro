import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { BillingAddress } from "./BillingAddress";
import { Purchase } from "./Purchase";

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

  @OneToMany(() => Purchase, (purchase) => purchase.supplier)
  purchases: Purchase[];
}
