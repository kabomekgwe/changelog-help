import { Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ClsService } from 'nestjs-cls';

@Injectable({ scope: Scope.DEFAULT })
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly cls: ClsService) {
    super();
    this.setupMiddleware();
  }

  async onModuleInit() {
    await this.$connect();
  }

  private setupMiddleware() {
    // Middleware for change logging
    this.$use(async (params, next) => {
      const userId = this.cls.get('userId');
      if (!userId) return next(params);

      const isWriteOperation = ['create', 'update', 'delete', 'upsert'].includes(params.action);
      if (!isWriteOperation) return next(params);

      // Get the previous state for update/delete operations
      let oldValue;
      if (['update', 'delete'].includes(params.action)) {
        oldValue = await this[params.model].findUnique({
          where: params.args.where,
        });
      }

      // Execute the operation
      const result = await next(params);

      // Log the change
      await this.changeLog.create({
        data: {
          entityType: params.model,
          entityId: String(result.id),
          userId: userId,
          changeType: this.mapActionToChangeType(params.action),
          oldValue: oldValue || undefined,
          newValue: result,
        },
      });

      return result;
    });

    // Middleware for user action logging
    this.$use(async (params, next) => {
      const userId = this.cls.get('userId');
      const ipAddress = this.cls.get('ipAddress');
      const userAgent = this.cls.get('userAgent');
      
      if (!userId) return next(params);

      const result = await next(params);

      // Log specific actions we want to track
      if (this.shouldLogUserAction(params)) {
        await this.userLog.create({
          data: {
            userId,
            action: this.mapActionToUserAction(params),
            ipAddress,
            userAgent,
          },
        });
      }

      return result;
    });
  }

  private mapActionToChangeType(action: string): 'CREATE' | 'UPDATE' | 'DELETE' {
    switch (action) {
      case 'create':
        return 'CREATE';
      case 'update':
      case 'upsert':
        return 'UPDATE';
      case 'delete':
        return 'DELETE';
      default:
        return 'UPDATE';
    }
  }

  private shouldLogUserAction(params: any): boolean {
    // Define which operations should be logged as user actions
    const actionMappings = {
      User: {
        update: true,
        create: true,
        delete: true,
      },
      // Add other models and their actions to track
    };

    return actionMappings[params.model]?.[params.action] || false;
  }

  private mapActionToUserAction(params: any): string {
    const actionMap = {
      create: 'CREATE',
      update: 'UPDATE',
      delete: 'DELETE',
    };

    return `${params.model.toUpperCase()}_${actionMap[params.action]}`;
  }
}