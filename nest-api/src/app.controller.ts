import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("/prefixo")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  getHello(): string {
    return this.appService.getHello();
  }


  @Get("hello")
  getHelloByName(@Query('name') name : string): string {
    return this.appService.getHelloByName(name)
  }
}
