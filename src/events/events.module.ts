import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EventsController } from './events.controller'
import { Events } from './events.entity'
import { Attendee } from '@/attendee/entity/attendee.entity'
import { EventsService } from './events.service'

@Module({
  imports: [TypeOrmModule.forFeature([Events, Attendee])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
