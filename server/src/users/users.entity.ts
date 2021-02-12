import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("Users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  username: string;

  @Column()
  password: string

  @Column()
  email: string

}
