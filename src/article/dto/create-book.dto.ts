import { IsInt, IsString } from 'class-validator'

export class CreateBookDto {
  @IsString()
  name: string

  @IsInt()
  price: number
}
