import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'
import { Game as GameType } from './../types/game'

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('json')
  data: GameType
}
