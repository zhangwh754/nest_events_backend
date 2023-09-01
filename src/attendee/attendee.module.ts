import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AttendeeController } from './attendee.controller'
import { AttendeeService } from './attendee.service'
import { Attendee } from './entity/attendee.entity'
import { Events } from '@/events/events.entity'
import { EventsService } from '@/events/events.service'

@Module({
  imports: [TypeOrmModule.forFeature([Attendee, Events])],
  controllers: [AttendeeController],
  providers: [AttendeeService, EventsService],
})
export class AttendeeModule {}
