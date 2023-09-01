import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from './user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { AuthService } from '@/auth/auth.service'
import { Role } from '@/auth/role.enum'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService
  ) {}

  private async findOneByName(username: string) {
    return this.userRepository.findOne({ where: { username } })
  }

  /**
   * @description: 创建新用户
   * @param {CreateUserDto} createUserDto
   */
  public async create(createUserDto: CreateUserDto) {
    try {
      const user = new User()

      const existUser = await this.userRepository.findOne({
        where: [{ username: createUserDto.username }, { email: createUserDto.email }],
      })

      if (existUser) {
        throw new HttpException('用户名或邮箱已存在', 400)
      }

      user.username = createUserDto.username
      user.password = await this.authService.hashPassword(createUserDto.password)
      user.email = createUserDto.email
      user.sex = createUserDto.sex
      user.identity = Role.User // 只允许创建普通用户

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...res } = await this.userRepository.save(user)

      return {
        ...res,
        token: this.authService.getTokenFromUser(user),
      }
    } catch (error) {
      throw error
    }
  }
}
