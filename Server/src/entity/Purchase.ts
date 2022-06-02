import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Purchase {
  @Column()
  supplierCode: string;

  @Column()
  documentID: string;

  @Column()
  date: Date;

  @Column()
  price: number;

  @Column()
  tax: number;

  @Column()
  totalPrice: number;
}
