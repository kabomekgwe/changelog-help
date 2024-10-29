import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChangeLogService {
  constructor(private prisma: PrismaService) {}

  async logChange(data: {
    entityType: string;
    entityId: string;
    userId: number;
    changeType: 'CREATE' | 'UPDATE' | 'DELETE';
    oldValue?: any;
    newValue?: any;
  }) {
    return this.prisma.changeLog.create({
      data: {
        entityType: data.entityType,
        entityId: data.entityId,
        userId: data.userId,
        changeType: data.changeType,
        oldValue: data.oldValue,
        newValue: data.newValue,
      },
    });
  }

  async getChangesByEntity(entityType: string, entityId: string) {
    return this.prisma.changeLog.findMany({
      where: {
        entityType,
        entityId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}