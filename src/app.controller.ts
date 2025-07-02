import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Logs } from './models/logs.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('create-log')
  async createLog(@Body() data: Logs): Promise<string> {
    return await this.appService.createLog(data);
  }
}
