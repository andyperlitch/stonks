import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './User'

export interface AvatarComponent {
  /** The id of the option being used for the given component type */
  optionId: string
  /** The type of the component */
  type: string
  /** The hue adjustment from the original component. Will be between -100 and 100 */
  hue: number
  /** The saturation adjustment from the original component. Will be between -100 and 100 */
  saturation: number
  /** The lightness adjustment from the original component. Will be between -100 and 100 */
  lightness: number
  /** The contrast adjustment from the original component. Will be between -100 and 100 */
  contrast: number
}

@Entity()
export class Avatar {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne((type) => User, (user) => user.avatars)
  user: User

  @Column()
  name?: string

  @Column('json')
  components: AvatarComponent[]

  @CreateDateColumn()
  createtAt: Date

  @UpdateDateColumn()
  lastModified: Date
}
