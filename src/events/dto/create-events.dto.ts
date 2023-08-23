import { IsString, IsDateString, Length } from 'class-validator'

export class CreateEventsDto {
  @IsString()
  @Length(5, 30)
  name: string

  @IsString()
  @Length(5, 255)
  description: string

  @IsDateString()
  when: string

  @IsString()
  @Length(5, 100)
  address: string
}
