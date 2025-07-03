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
  async createLog(@Body() data: Logs) {


    try {
          const response: string = await this.appService.createLog(data);   
          
          return {
              message: 'Log created successfully',
              success: true,
            }; 
    } catch (error) {
      return {
              message: 'Failed to create log. ' + error?.message,
              success: false,
            };
    }

          
  }
}
