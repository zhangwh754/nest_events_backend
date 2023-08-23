import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor(
    @Inject('APP_NAME')
    private readonly appName: string
  ) {}

  getHello(): string {
    const msg = `Hello World from ${this.appName}`

    return msg
  }
}
