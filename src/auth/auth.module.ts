import { User } from '@/user/user.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LocalStrategy } from './local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '24h',
        },
      }),
    }),
  ],
  providers: [LocalStrategy, JwtStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
