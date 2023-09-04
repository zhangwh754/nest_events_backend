import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common'

import { AttendeeService } from './attendee.service'
import { PaginationDto } from '@/app/dto'
import { CurrentUser } from '@/app/decorator'
import { User } from '@/user/user.entity'
import { Auth } from '@/auth/auth.decorator'
import { Role } from '@/auth/role.enum'
import { AttendeeDto } from './dto/attendee.dto'

@Controller('attendee')
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) {}

  @Get()
  async find(@Query() pagination: PaginationDto) {
    const { pageNum, pageSize = 10 } = pagination

    return await this.attendeeService.find(pageNum, pageSize)
  }

  @Auth(Role.User)
  @Post(':id')
  async create(@CurrentUser() currentUser: User, @Param('id') id: number, @Body() attendeeDto: AttendeeDto) {
    return await this.attendeeService.create(currentUser, id, attendeeDto.answer)
  }

  @Auth(Role.User)
  @Patch(':id')
  async update(@CurrentUser() currentUser: User, @Param('id') id: number, @Body() attendeeDto: AttendeeDto) {
    return await this.attendeeService.update(currentUser, id, attendeeDto.answer)
  }
}
