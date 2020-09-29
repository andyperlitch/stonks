import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Avatar {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @ManyToOne((type) => User, (user) => user.avatars)
  user: User

  @Column()
  name?: string

  @Column('json')
  components: {
    /** The id of the option being used for the given component type */
    id: string
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
  }[]
}
