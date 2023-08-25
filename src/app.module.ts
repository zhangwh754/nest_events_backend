import { Module, Logger } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EventsModule } from './events/events.module'
import { AppChineseService } from './app.chinese.service'
import { ormConfig, ormConfigProd } from './app/config'
import { AttendeeModule } from './attendee/attendee.module'
import { SchoolModule } from './school/school.module'

const isChinese = true

class AppDummy {
  public getDummy(): string {
    return 'dummy msg'
  }
}

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
  ],
  controllers: [AppController],
  providers: [
    Logger,
    {
      provide: AppService,
      useClass: isChinese ? AppChineseService : AppService,
    },
    {
      provide: 'APP_NAME',
      useValue: 'Nest Events Backend',
    },
    AppDummy,
    {
      provide: 'MESSAGE',
      inject: [AppDummy],
      useFactory: app => app.getDummy(),
    },
  ],
})
export class AppModule {}
