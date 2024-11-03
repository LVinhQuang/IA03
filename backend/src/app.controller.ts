import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

interface User {
  email: string,
  password: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  login(@Body() user: User) {
    return this.appService.login(user.email, user.password)
  }

  @Post('/user/register')
  register(@Body() user: {email: string, password: string}): Promise<{message: string}> {
    return this.appService.register(user.email, user.password);
  }
}
