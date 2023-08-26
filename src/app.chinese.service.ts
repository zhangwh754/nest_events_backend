import { Inject, Injectable, Logger } from '@nestjs/common'

@Injectable()
export class AppChineseService {
  constructor(
    @Inject('APP_NAME')
    private readonly appName: string,
    @Inject('MESSAGE')
    private readonly message: string,
    private readonly logger: Logger
  ) {}

  getHello(): string {
    this.logger.debug('hello world debugger')
    this.logger.warn('hello world warn')

    const msg = `你好世界 from ${this.appName} | ${this.message}`

    return msg
  }
}
