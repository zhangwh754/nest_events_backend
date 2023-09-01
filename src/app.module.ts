import { Module, Logger } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { EventsModule } from './events/events.module'
import { ormConfig, ormConfigProd } from './app/config'
import { AttendeeModule } from './attendee/attendee.module'
import { SchoolModule } from './school/school.module'
import { ArticleModule } from './article/article.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { JwtAuthGuard } from './auth/jwt-auth.guard'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig, ormConfigProd],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
    EventsModule,
    AttendeeModule,
    SchoolModule,
    ArticleModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    Logger,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
