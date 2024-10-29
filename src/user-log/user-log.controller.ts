import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserLogService } from './user-log.service';
import { LogUserActionDto } from './dto/log-user-action.dto';

@Controller('user-log')
export class UserLogController {
  constructor(private readonly userLogService: UserLogService) {}

  @Post()
  async logUserAction(@Body() logUserActionDto: LogUserActionDto) {
    return this.userLogService.logUserAction(logUserActionDto);
  }

  @Get(':userId')
  async getUserLogs(@Param('userId') userId: string) {
    return this.userLogService.getUserLogs(Number(userId));
  }
}