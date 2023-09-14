import { Module } from '@nestjs/common'

import { FileController } from './file.controller'
import { MulterModule } from '@nestjs/platform-express'
import { multerConfig } from 'src/app/config'

@Module({
  imports: [MulterModule.register(multerConfig)],
  controllers: [FileController],
  providers: [],
})
export class FileModule {}
