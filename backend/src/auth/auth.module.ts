import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [AuthGuard],
  exports: [AuthGuard]
})
export class AuthModule {}
