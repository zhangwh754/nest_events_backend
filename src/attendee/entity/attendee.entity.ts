import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Events } from '@/events/entity/events.entity'

@Entity('attendee')
export class Attendee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => Events, event => event.attendees)
  event: Events
}
