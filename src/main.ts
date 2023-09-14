import { resolve } from 'path'

import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'
import { validationPipeConfig } from './app/pipe/validate.pipe'
import { ExceptionInterceptor } from './app/filter'
import { ResponseInterceptor } from './app/interceptor'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: ['error', 'warn', 'debug']
  })
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig))
  app.useGlobalFilters(new ExceptionInterceptor())
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useStaticAssets(resolve(process.cwd(), 'public/resource'), { prefix: '/file' })
  app.useStaticAssets(resolve(process.cwd(), 'public/static'), { prefix: '/demo' })

  await app.listen(3000)
}
bootstrap()
