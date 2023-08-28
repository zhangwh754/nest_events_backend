import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { BookService } from './book.service'
import { PaginationDto } from '@/app/dto'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'

@Controller('/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async find(@Query() paginationDto: PaginationDto) {
    return await this.bookService.findAll(paginationDto)
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.bookService.findOne(id)
  }

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.bookService.create(createBookDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.bookService.remove(id)
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return await this.bookService.update(id, updateBookDto)
  }
}
