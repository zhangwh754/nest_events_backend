import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@/user/user.entity'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public getTokenFromUser(user: User) {
    return this.jwtService.sign({
      username: user.username,
      sub: user.userId,
    })
  }
}
