import * as bcrypt from 'bcryptjs';
import { Post } from 'src/posts/entities/post.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fistName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  @Column({select: false})
  password: string;
  @Column()
  profilePic: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
