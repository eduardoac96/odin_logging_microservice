import { IsDateString, isString, IsString } from 'class-validator';

export class Logs {

@IsString()
  message: string;
@IsString()
  stackTrace: string;
@IsString()
  level: string;

@IsDateString()
    timestamp: string;
}