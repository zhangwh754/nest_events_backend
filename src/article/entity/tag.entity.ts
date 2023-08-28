import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Book } from './book.entity'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => Book, book => book.tags)
  @JoinTable()
  books: Book[]
}
