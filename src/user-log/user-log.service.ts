import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserLogService {
  constructor(private prisma: PrismaService) {}

  async logUserAction(data: {
    userId: number;
    action: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return this.prisma.userLog.create({
      data: {
        userId: data.userId,
        action: data.action,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    });
  }

  async getUserLogs(userId: number) {
    return this.prisma.userLog.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}