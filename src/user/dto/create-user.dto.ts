import { IsEmail, IsEnum, IsOptional, Length } from 'class-validator'

export enum Sex {
  male = 0,
  female,
  unknown = 99,
}

export class CreateUserDto {
  @Length(3, 10)
  username: string

  @Length(6, 20)
  password: string

  @IsEmail()
  email: string

  @IsOptional()
  @IsEnum(Sex)
  sex: Sex
}
