import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class ExceptionInterceptor implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception?.getStatus ? exception.getStatus() : 500

    response.status(status).json({
      statusCode: status,
      message: (exception as any)?.response?.message || exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    })
  }
}
