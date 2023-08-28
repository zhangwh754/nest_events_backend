import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Tag } from './tag.entity'

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  price: number

  @ManyToMany(() => Tag, tag => tag.books)
  tags: Tag[]
}
