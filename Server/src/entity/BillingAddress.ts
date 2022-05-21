import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";
import { Supplier } from "./Supplier";

@Entity()
export class BillingAddress {
  @PrimaryGeneratedColumn()
  addressId: number;

  @Column()
  postalCode: string;

  @Column()
  city: string;

  @Column()
  addressDetail: string;

  @Column()
  country: string;

  @OneToMany(() => Supplier, (supplier) => supplier.billingAddress)
  supplier: Supplier[];

  @OneToMany(() => Customer, (customer) => customer.billingAddress)
  customer: Customer[];
}
