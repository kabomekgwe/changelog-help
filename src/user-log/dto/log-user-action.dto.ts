import { IsString, IsNumber, IsOptional } from 'class-validator';

export class LogUserActionDto {
  @IsNumber()
  userId: number;

  @IsString()
  action: string;

  @IsString()
  @IsOptional()
  ipAddress?: string;

  @IsString()
  @IsOptional()
  userAgent?: string;
}