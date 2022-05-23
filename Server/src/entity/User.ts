import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userID: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
