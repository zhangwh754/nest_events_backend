import { IsEnum, IsOptional } from 'class-validator'
import { AttendeeAnswerEnum } from '../attendee.entity'

export class AttendeeDto {
  @IsEnum(AttendeeAnswerEnum)
  @IsOptional()
  answer: number
}
