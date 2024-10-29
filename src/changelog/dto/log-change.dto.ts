import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';

export enum ChangeType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export class LogChangeDto {
  @IsString()
  entityType: string;

  @IsString()
  entityId: string;

  @IsNumber()
  userId: number;

  @IsEnum(ChangeType)
  changeType: ChangeType;

  @IsOptional()
  oldValue?: any;

  @IsOptional()
  newValue?: any;
}