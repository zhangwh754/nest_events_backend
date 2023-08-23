import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('events')
export class Events {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  when: Date

  @Column()
  address: string
}
