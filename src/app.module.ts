import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Events } from './events/entity/events.entity'
import { EventsModule } from './events/events.module'
import { AppChineseService } from './app.chinese.service'

const isChinese = true

class AppDummy {
  public getDummy(): string {
    return 'dummy msg'
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3307,
      username: 'root',
      password: '123456',
      database: 'nest_events',
      entities: [Events],
      synchronize: true
    }),
    EventsModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: isChinese ? AppChineseService : AppService
    },
    {
      provide: 'APP_NAME',
      useValue: 'Nest Events Backend'
    },
    AppDummy,
    {
      provide: 'MESSAGE',
      inject: [AppDummy],
      useFactory: app => app.getDummy()
    }
  ]
})
export class AppModule {}
