import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'
import { Game as GameJson } from './../types/game'

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string

  /**
   * The entry code
   */
  @Column()
  code: string

  /**
   * The serialized game details
   */
  @Column('json')
  game: GameJson

  /**
   * The map of user ids to nicknames
   */
  @Column('json')
  users: { [userId: string]: string }
}
