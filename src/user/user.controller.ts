import { Controller, Post, Request, UseGuards } from '@nestjs/common'

import { UserService } from './user.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() request) {
    return {
      userId: request.user.userId,
      access_token: 'access_token',
    }
  }
}
