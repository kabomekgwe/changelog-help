import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { PrismaService } from './prisma/prisma.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserContextInterceptor } from './interceptors/user-context.interceptor';

@Module({
  imports: [
    ClsModule.forRoot({
      middleware: {
        mount: true,
        setup: (cls, req) => {
          // Set user context from request
          cls.set('userId', req.user?.id);
          cls.set('ipAddress', req.ip);
          cls.set('userAgent', req.headers['user-agent']);
        },
      },
    }),
  ],
  providers: [
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserContextInterceptor,
    },
  ],
})
export class AppModule {}