import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from 'typeorm'
import { Avatar } from './Avatar'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index({ unique: true })
  @Column()
  email?: string

  @Column()
  username: string

  @Column()
  googleId: string

  @Column()
  thumbnail: string

  @OneToMany((type) => Avatar, (avatar) => avatar.user)
  avatars: Avatar[]
}
