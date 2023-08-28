import { ArrayMinSize, IsArray, IsNumber } from 'class-validator'

export class AddBookTagsDto {
  @IsArray()
  @ArrayMinSize(1) // 确保数组不为空
  @IsNumber({}, { each: true }) // 确保每个项都是数字
  ids: number[]
}
