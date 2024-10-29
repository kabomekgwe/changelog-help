import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUser(id: number, data: { name?: string; email?: string }) {
    // The logging is now handled automatically by the Prisma middleware
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async login(id: number) {
    // The logging is now handled automatically by the Prisma middleware
    return { success: true };
  }
}