import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { ROLES_KEY } from './auth.decorator'
import { Role } from './role.enum'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<boolean>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) return true // 没有使用装饰器，即无需权限的接口

    const request = context.switchToHttp().getRequest<Request>()

    request['requiredRoles'] = requiredRoles

    return super.canActivate(context)
  }

  handleRequest(_err, user, _info, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const requiredRoles: Role[] = request['requiredRoles']

    if (user.identity === 'admin' || requiredRoles.includes(user.identity)) return user
    else throw new UnauthorizedException()
  }
}
