import { IsInt, IsString, Length } from 'class-validator'

export class CreateAttendeeDto {
  @IsString()
  @Length(3, 30)
  name: string

  @IsInt()
  eventId: number
}
