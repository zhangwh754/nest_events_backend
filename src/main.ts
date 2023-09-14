import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'
import { validationPipeConfig } from './app/pipe/validate.pipe'
import { ExceptionInterceptor } from './app/filter'
import { ResponseInterceptor } from './app/interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn', 'debug']
  })
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig))
  app.useGlobalFilters(new ExceptionInterceptor())
  app.useGlobalInterceptors(new ResponseInterceptor())

  app.enableCors()

  await app.listen(3000)
}
bootstrap()
