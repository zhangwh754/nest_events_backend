import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Events } from '@/events/events.entity'
import { User } from '@/user/user.entity'

export enum AttendeeAnswerEnum {
  Accepted = 1,
  Maybe,
  Rejected,
}

@Entity('attendee')
export class Attendee {
  @PrimaryGeneratedColumn()
  id: number

  // @Column()
  // name: string

  @ManyToOne(() => User, user => user.attended)
  @JoinColumn({ name: 'userId' })
  user: User

  @ManyToOne(() => Events, event => event.attendees)
  event: Events

  @Column('enum', {
    enum: AttendeeAnswerEnum,
    default: 1,
  })
  answer: number
}
