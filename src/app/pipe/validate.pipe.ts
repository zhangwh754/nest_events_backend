import { ValidationPipeOptions, HttpException, HttpStatus } from '@nestjs/common'
import { ValidationError } from 'class-validator'

// 自定义异常工厂函数，只返回第一个错误
// const exceptionFactory = (errors: ValidationError[]) => {
//   const firstError = errors[0]
//   const errorMessage =
//     firstError && firstError.constraints ? Object.values(firstError.constraints)[0] : 'Validation failed'
//   return new HttpException(errorMessage, HttpStatus.BAD_REQUEST)
// }

export const validationPipeConfig: ValidationPipeOptions = {
  transform: true,
  transformOptions: { enableImplicitConversion: true },
  // exceptionFactory: exceptionFactory,
}
