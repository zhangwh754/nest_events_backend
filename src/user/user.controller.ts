import { Body, ClassSerializerInterceptor, Controller, Get, Post, Request, UseInterceptors } from '@nestjs/common'

import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { Auth } from '@/auth/auth.decorator'
import { Role } from '@/auth/role.enum'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @Auth(Role.User)
  async getProfile(@Request() request) {
    return request.user
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }
}
