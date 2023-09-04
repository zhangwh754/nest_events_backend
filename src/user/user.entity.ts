import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Exclude } from 'class-transformer'
import { Attendee } from '@/attendee/attendee.entity'
import { Role } from '@/auth/role.enum'
import { Events } from '@/events/events.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number

  @Column({
    unique: true,
  })
  username: string

  @Exclude()
  @Column()
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

export class createUser extends User {
  constructor(partial: Partial<createUser>) {
    super()
    Object.assign(this, partial)
  }

  token: string
}
