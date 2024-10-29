import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ChangeLogService } from './changelog.service';
import { LogChangeDto } from './dto/log-change.dto';

@Controller('changelog')
export class ChangeLogController {
  constructor(private readonly changeLogService: ChangeLogService) {}

  @Post()
  async logChange(@Body() logChangeDto: LogChangeDto) {
    return this.changeLogService.logChange(logChangeDto);
  }

  @Get(':entityType/:entityId')
  async getChangesByEntity(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
  ) {
    return this.changeLogService.getChangesByEntity(entityType, entityId);
  }
}