import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./users.entity";

@Entity("Addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  addressLine1: string;

  @Column()
  AddressLine2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: number;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;
}
