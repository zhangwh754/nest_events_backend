import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateEventsDto, QueryEventsDto, UpdateEventsDto } from './dto/events.dto'
import { Events } from './events.entity'
import { EventsService } from './events.service'
import { CurrentUser } from '@/app/decorator'
import { User } from '@/user/user.entity'
import { Auth } from '@/auth/auth.decorator'
import { Role } from '@/auth/role.enum'

@Controller('/events')
export class EventsController {
  constructor(
    @InjectRepository(Events) private readonly events: Repository<Events>,
    private readonly eventsService: EventsService
  ) {}

  @Get()
  async findAll(@Query() queryEventsDto: QueryEventsDto) {
    return await this.eventsService.findPage(queryEventsDto)
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.eventsService.findById(id)
  }

  @Auth(Role.User)
  @Post()
  async create(@CurrentUser() currentUser: User, @Body() createEventsDto: CreateEventsDto) {
    return this.eventsService.create(currentUser, createEventsDto)

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
