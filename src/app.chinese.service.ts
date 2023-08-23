import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class AppChineseService {
  constructor(
    @Inject('APP_NAME')
    private readonly appName: string,
    @Inject('MESSAGE')
    private readonly message: string
  ) {}

  getHello(): string {
    const msg = `你好世界 from ${this.appName} | ${this.message}`

    return msg
  }
}
