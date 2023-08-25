import { IsOptional, IsNumber } from 'class-validator'

const numberConfig = { message: '$property是数字' }

export class PaginationDto {
  @IsNumber({}, numberConfig)
  pageNum: number

  @IsOptional()
  @IsNumber({}, numberConfig)
  pageSize?: number = 10
}
