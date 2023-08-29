import { User } from '@/user/user.entity'
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Strategy } from 'passport-local'
import { Repository } from 'typeorm'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger('LocalStrategy')

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super()
  }

  public async validate(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } })

    if (!user) {
      this.logger.debug(`用户:${username}不存在`)
      throw new UnauthorizedException()
    }

    if (user.password !== password) {
      this.logger.debug(`${username}密码错误`)
      throw new UnauthorizedException()
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userData } = user

    this.logger.log(`${username}登录成功`)

    return userData
  }
}
