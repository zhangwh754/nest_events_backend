import { PaginationDto } from '@/app/dto'

export enum QueryWhenDto {
  All = 1,
  Today,
  Tomorrow,
  ThisWeek,
  NextWeek,
}

export class QueryEventsDto extends PaginationDto {
  when?: QueryWhenDto = QueryWhenDto.All
}
