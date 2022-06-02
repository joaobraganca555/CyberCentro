import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Supplier } from "./Supplier";

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  purchaseID: string;

  @Column()
  supplierCode: string;

  @Column()
  documentID: string;

  @Column()
  dateP: string;

  @Column()
  price: string;

  @Column()
  tax: string;

  @Column()
  totalPrice: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.supplierID)
  supplier: Supplier;
}
