import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Attendee } from '@/attendee/attendee.entity'
import { User } from '@/user/user.entity'

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

  @OneToMany(() => Attendee, attendee => attendee.event)
  attendees: Attendee[]

  attendeeCount?: number

  attendeeAccepted?: number
  attendeeMaybe?: number
  attendeeRejected?: number

  @ManyToOne(() => User, user => user.organized)
  @JoinColumn({ name: 'organizerId' })
  organizer: User

  @Column({ nullable: true })
  organizerId: number
}
