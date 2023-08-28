import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, RelationOptions } from 'typeorm'
import { Teacher } from './teacher.entity'

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => Teacher, teacher => teacher.subjects, { cascade: true })
  @JoinTable()
  teachers: Teacher[]
}
