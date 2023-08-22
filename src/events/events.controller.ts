import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateEventsDto, UpdateEventsDto } from './dto/events.dto'
import { Events } from './entity/events.enetity'

@Controller('/events')
export class EventsController {
  private events: Events[] = []

  @Get()
  findAll() {
    return this.events
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const item = this.events.find(item => item.id === parseInt(id))

    return item || {}
  }

  @Post()
  create(@Body() createEventsDto: CreateEventsDto) {
    const event = {
      ...createEventsDto,
      when: new Date(createEventsDto.when),
      id: this.events.length + 1
    }

    this.events.push(event)

    return event
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventsDto: UpdateEventsDto) {
    const eventIndex = this.events.findIndex(item => item.id === parseInt(id))

    this.events[eventIndex]

    this.events[eventIndex] = {
      ...this.events[eventIndex],
      ...updateEventsDto,
      when: updateEventsDto.when ? new Date(updateEventsDto.when) : new Date(this.events[eventIndex].when)
    }

    return this.events[eventIndex]
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.events.filter(item => item.id !== parseInt(id))

    return `删除${id}成功`
  }
}
