import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
