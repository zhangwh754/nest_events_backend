import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateEventsDto, UpdateEventsDto } from './dto/events.dto'
import { Events } from './entity/events.entity'

@Controller('/events')
export class EventsController {
  constructor(@InjectRepository(Events) private readonly events: Repository<Events>) {}

  @Get()
  async findAll() {
    return await this.events.find({ relations: ['attendees'] })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.events.findOneBy({ id: parseInt(id) })
  }

  @Post()
  async create(@Body() createEventsDto: CreateEventsDto) {
    return await this.events.save({
      ...createEventsDto,
      when: new Date(createEventsDto.when),
    })
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEventsDto: UpdateEventsDto) {
    const event = new Events()

    event.name = updateEventsDto.name
    event.description = updateEventsDto.description
    event.address = updateEventsDto.address
    if (updateEventsDto.when) event.when = new Date(updateEventsDto.when)

    await this.events.update(id, event)

    return '更新成功'
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.events.delete(id)

    return '删除成功'
  }
}
