import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Address } from './addresses.entity';
import { UserType } from './userTypes.entity';

@Entity("Users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @ManyToOne(() => UserType, userType => userType.users)
  userType: UserType;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];
}
