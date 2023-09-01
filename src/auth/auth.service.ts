import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
// import * as bcrypt from 'bcrypt'
import { User } from '@/user/user.entity'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public getTokenFromUser(user: User) {
    return this.jwtService.sign(
      {
        username: user.username,
        sub: user.userId,
        identity: user.identity,
      },
      { secret: process.env.JWT_SECRET }
    )
  }

  /**
   * @description: 使用bcrypt哈希化密码
   * @param {string} password
   */
  public async hashPassword(password: string) {
    // return await bcrypt.hash(password, 10)
    return await Promise.resolve(password)
  }
}
