import { User } from '@/user/user.entity'
import { Injectable, Logger } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Repository } from 'typeorm'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name)

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  public async validate(payload: any) {
    return { userId: payload.sub, username: payload.username }
  }
}
