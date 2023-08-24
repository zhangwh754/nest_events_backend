import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common'

import { CreateAttendeeDto, UpdateAttendeeDto } from './dto/attendee.dto'
import { AttendeeService } from './attendee.service'
import { PaginationDto } from '@/app/dto'

@Controller('attendee')
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) {}

  @Get()
  async find(@Query() pagination: PaginationDto) {
    const { pageNum, pageSize = 10 } = pagination

    return await this.attendeeService.find(pageNum, pageSize)
  }

  @Post()
  async create(@Body() createAttendeeDto: CreateAttendeeDto) {
    return await this.attendeeService.create(createAttendeeDto)
  }

  @Patch()
  async update(@Body() updateAttendeeDto: UpdateAttendeeDto) {
    return updateAttendeeDto
  }
}
