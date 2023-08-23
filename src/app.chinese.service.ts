import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppChineseService {
  constructor(
    @Inject('APP_NAME')
    private readonly appName: string,
    @Inject('MESSAGE')
    private readonly message: string,
    private configService: ConfigService
  ) {}

  getHello(): string {
    const result = this.configService.get('orm.config')

    debugger

    const msg = `你好世界 from ${this.appName} | ${this.message}`

    return msg
  }
}
