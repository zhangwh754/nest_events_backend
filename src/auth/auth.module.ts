import { User } from '@/user/user.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LocalStrategy } from './local.strategy'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [LocalStrategy],
})
export class AuthModule {}
