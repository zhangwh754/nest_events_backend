import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Book } from './entity/book.entity'
import { BookService } from './book.service'
import { BookController } from './book.controller'
import { Tag } from './entity/tag.entity'
import { TagController } from './tag.controller'
import { TagService } from './tag.service'

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Book])],
  controllers: [TagController, BookController],
  providers: [TagService, BookService],
})
export class ArticleModule {}
