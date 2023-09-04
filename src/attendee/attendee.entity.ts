import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Events } from '@/events/events.entity'

export enum AttendeeAnswerEnum {
  Accepted = 1,
  Maybe,
  Rejected,
}

@Entity('attendee')
export class Attendee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => Events, event => event.attendees)
  event: Events

  @Column('enum', {
    enum: AttendeeAnswerEnum,
    default: 1,
  })
  answer: number
}
