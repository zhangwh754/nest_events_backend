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
  providers: [Logger],
})
export class AppModule {}
