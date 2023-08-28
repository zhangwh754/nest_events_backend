import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { TagService } from './tag.service'
import { PaginationDto } from '@/app/dto'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateBookDto } from './dto/update-book.dto'

@Controller('/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async find(@Query() paginationDto: PaginationDto) {
    return await this.tagService.findAll(paginationDto)
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tagService.findOne(id)
  }

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    return await this.tagService.create(createTagDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.tagService.remove(id)
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return await this.tagService.update(id, updateBookDto)
  }
}
