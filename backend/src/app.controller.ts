import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

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

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/login')
  login(@Body() user: User) {
    return this.appService.login(user.email, user.password)
  }

  @Post('/register')
  register(@Body() user: {email: string, password: string}): Promise<{message: string}> {
    return this.appService.register(user.email, user.password);
  }
}
