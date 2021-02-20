import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  BeforeInsert,
} from 'typeorm'
import { Game as GameJson, GameStatus } from './../types/game'

// TODO: Move to a better spot, de-dup elsewhere
const COMPLETE_STATUSES: GameStatus[] = ['CANCELLED', 'COMPLETE']

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string

  /**
   * The entry code
   */
  @Index()
  @Column()
  code: string

  /**
   * The last saved status of the game
   */
  @Index()
  @Column({
    type: 'bool',
    default: false,
  })
  completed: boolean

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

  /**
   * Updates the status field
   */
  @BeforeInsert()
  _updateStatus() {
    this.completed = COMPLETE_STATUSES.includes(this.game.status)
  }
}
