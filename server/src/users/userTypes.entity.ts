import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./users.entity";

@Entity("UserTypes")
export class UserType {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.userType)
  users: User[];
}
