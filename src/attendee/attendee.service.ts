import { HttpException, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Attendee } from './attendee.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { EventsService } from '@/events/events.service'
import { User } from '@/user/user.entity'

@Injectable()
export class AttendeeService {
  constructor(
    @InjectRepository(Attendee)
    private readonly attendRepository: Repository<Attendee>,
    private readonly eventsService: EventsService
  ) {}

  async find(pageNum: number, pageSize: number) {
    const data = await this.findData(pageNum, pageSize)
    const totalCount = await this.findCount()

    return {
      pageNum: +pageNum,
      pageSize: +pageSize,
      totalCount: totalCount,
      data: data,
    }
  }

  public async create(currentUser: User, eventId: number, answer: number) {
    try {
      const event = await this.eventsService.findById(eventId)
      if (!event) throw new HttpException('event不存在', 400)

      if (event.organizerId === currentUser.userId) throw new HttpException('不能参加自己举办的会议', 400)

      let attendee = await this.getBaseQuery()
        .where('attendee.eventId = :eventId', { eventId: eventId })
        .andWhere('attendee.userId = :userId', { userId: currentUser.userId })
        .getOne()

      if (attendee) throw new HttpException(`当前用户已参加本次会议`, 400)

      attendee = new Attendee()
      attendee.user = currentUser
      attendee.event = event
      attendee.answer = answer

      await this.attendRepository.save(attendee)
      return '参会成功'
    } catch (error) {
      throw error
    }
  }

  public async update(currentUser: User, eventId: number, answer: number) {
    try {
      await this.getBaseQuery()
        .update(Attendee)
        .set({ answer: answer })
        .where('eventId = :eventId', { eventId: eventId })
        .execute()

      return '更新参会期望成功'
    } catch (error) {
      throw error
    }
  }

  private async findById(id: number) {
    try {
      return await this.attendRepository.findOne({ where: { id: id } })
    } catch (error) {
      throw new HttpException(error, 400)
    }
  }

  private async findData(pageNum: number, pageSize: number) {
    const offset = pageSize * (pageNum - 1)

    try {
      const data = await this.attendRepository.find({
        order: { id: 'DESC' },
        // relations: ['event'],
        skip: offset,
        take: pageSize,
      })

      return data
    } catch (error) {
      throw new HttpException(error, 400)
    }
  }

  private async findCount() {
    try {
      return await this.attendRepository.count()
    } catch (error) {
      throw new HttpException(error, 400)
    }
  }

  private getBaseQuery() {
    return this.attendRepository.createQueryBuilder('attendee')
  }
}
