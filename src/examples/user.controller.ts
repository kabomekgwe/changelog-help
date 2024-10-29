import { Controller, Post, Body, Put, Param, Headers } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: { name?: string; email?: string },
  ) {
    return this.userService.updateUser(Number(id), updateData);
  }

  @Post(':id/login')
  async login(
    @Param('id') id: string,
    @Headers('x-forwarded-for') ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.userService.login(Number(id), ipAddress, userAgent);
  }
}