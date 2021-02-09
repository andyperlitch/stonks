import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'

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
}
