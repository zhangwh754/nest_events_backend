import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Events } from './entity/events.entity'
import { Repository } from 'typeorm'

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private readonly eventsRepository: Repository<Events>
  ) {}

  async findById(id: number) {
    try {
      return this.eventsRepository.findOne({ where: { id: id } })
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }
}
