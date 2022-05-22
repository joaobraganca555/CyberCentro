import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { BillingAddress } from "./BillingAddress";

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
}
