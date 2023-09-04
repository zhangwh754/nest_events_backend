import { Attendee } from '@/attendee/attendee.entity'
import { Role } from '@/auth/role.enum'
import { Events } from '@/events/events.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number

  @Column({
    unique: true,
  })
  username: string

  @Column({
    select: false,
  })
  password: string

  @Column({
    unique: true,
  })
  email: string

  @Column({
    default: 99,
  })
  sex: number

  @Column({
    default: Role.User,
  })
  identity: Role

  @OneToMany(() => Events, events => events.organizer)
  organized: Events[]

  @OneToMany(() => Attendee, attendee => attendee.user)
  attended: Attendee[]
}
