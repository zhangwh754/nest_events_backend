import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Book } from './book.entity'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => Book, book => book.tags)
  books: Book[]
}
