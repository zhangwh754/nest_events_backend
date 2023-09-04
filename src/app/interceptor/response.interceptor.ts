import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable, map } from 'rxjs'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(v => (v == null ? '' : v)), // 避免返回空值
      map(v => ({ statusCode: 200, message: 'success', result: v })) // 格式处理
    )
  }
}
