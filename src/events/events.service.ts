import { HttpException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Events } from './events.entity'
import { Repository } from 'typeorm'
import { AttendeeAnswerEnum } from '@/attendee/entity/attendee.entity'
import { QueryEventsDto, QueryWhenDto } from './dto/query-events.dto'
import { paginate } from '@/app/pagination'
import { User } from '@/user/user.entity'
import { CreateEventsDto } from './dto/create-events.dto'

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private readonly eventsRepository: Repository<Events>
  ) {}

  private readonly logger = new Logger(Events.name)

  /**
   * @description: 新建
   */
  async create(currentUser: User, createEventsDto: CreateEventsDto) {
    try {
      await this.getBaseQuery()
        .insert()
        .into(Events)
        .values({ ...createEventsDto, organizer: currentUser, when: new Date(createEventsDto.when) })
        .execute()

      return '创建成功'
    } catch (error) {
      throw error
    }
  }

  /**
   * @description:根据id查询
   * @param {number} id
   */
  async findById(id: number) {
    try {
      const query = this.getRelationCountQuery().andWhere('id = :id', { id })

      return await query.getOne()
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }

  /**
   * @description: 分页接口
   * @param {QueryEventsDto} queryEventsDto
   */
  async findPage(queryEventsDto: QueryEventsDto) {
    let query = this.getBaseQuery()

    switch (Number(queryEventsDto.when)) {
      case QueryWhenDto.Today:
        query = query.andWhere('DATE(`when`) = (CURDATE())')
        break
      case QueryWhenDto.Tomorrow:
        query = query.andWhere('DATE(`when`) = (CURDATE() + 1)')
        break
      case QueryWhenDto.ThisWeek:
        query = query.andWhere('`when` >= DATE_ADD(CURDATE(), INTERVAL 1 - DAYOFWEEK(CURDATE()) DAY)')
        query = query.andWhere('`when` <= DATE_ADD(CURDATE(), INTERVAL 7 - DAYOFWEEK(CURDATE()) DAY)')
        break
      case QueryWhenDto.NextWeek:
        query = query.andWhere('`when` >= DATE_ADD(CURDATE(), INTERVAL 8 - DAYOFWEEK(CURDATE()) DAY)')
        query = query.andWhere('`when` <= DATE_ADD(CURDATE(), INTERVAL 14 - DAYOFWEEK(CURDATE()) DAY)')
        break
      default:
        break
    }

    return paginate(query, queryEventsDto)
  }

  /**
   * @description: 查询与会者人数、同意人数、待定人数、拒绝人数
   */
  private getRelationCountQuery() {
    return this.getBaseQuery()
      .loadRelationCountAndMap('events.attendeeCount', 'events.attendees')
      .loadRelationCountAndMap('events.attendeeAccepted', 'events.attendees', 'attendee', qb =>
        qb.where('attendee.answer = :answer', { answer: AttendeeAnswerEnum.Accepted })
      )
      .loadRelationCountAndMap('events.attendeeMaybe', 'events.attendees', 'attendee', qb =>
        qb.where('attendee.answer = :answer', { answer: AttendeeAnswerEnum.Maybe })
      )
      .loadRelationCountAndMap('events.attendeeRejected', 'events.attendees', 'attendee', qb =>
        qb.where('attendee.answer = :answer', { answer: AttendeeAnswerEnum.Rejected })
      )
  }

  /**
   * @description: 基础查询器
   */
  private getBaseQuery() {
    return this.eventsRepository.createQueryBuilder('events')
  }
}
