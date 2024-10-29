import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class UserContextInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    
    // Set user context in CLS
    this.cls.set('userId', request.user?.id);
    this.cls.set('ipAddress', request.ip);
    this.cls.set('userAgent', request.headers['user-agent']);

    return next.handle();
  }
}