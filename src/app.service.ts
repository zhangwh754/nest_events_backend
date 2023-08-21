import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    const msg = 'Hello World'

    return msg
  }
}
