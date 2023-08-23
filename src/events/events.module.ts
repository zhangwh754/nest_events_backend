import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Events } from './entity/events.entity'
import { EventsController } from './events.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Events])],
  controllers: [EventsController]
})
export class EventsModule {}
