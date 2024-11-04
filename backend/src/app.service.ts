import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { HttpException, HttpStatus } from '@nestjs/common';
import { sql } from '@vercel/postgres';
import { JwtService } from '@nestjs/jwt';

interface User {
  email: string,
  password: string
}

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async register(email: string, password: string): Promise<{message: string}> {
    // Check if email exists
    const { rows } = await sql`
      SELECT * FROM Accounts WHERE email = ${email}
    `;

    if (rows.length > 0) {
      throw new HttpException('Email đã tồn tại', HttpStatus.CONFLICT);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    await sql`
      INSERT INTO Accounts (email, password)
      VALUES (${email}, ${hashedPassword})
    `;

    return {message: "Đăng ký thành công"}
  }

  async login(email: string, password: string) {
    const { rows } = await sql`
      SELECT * FROM Accounts WHERE email = ${email}
    `;

    if (rows.length === 0) {
      throw new HttpException('Email không tồn tại', HttpStatus.NOT_FOUND);
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException('Mật khẩu không đúng', HttpStatus.UNAUTHORIZED);
    }
    const payload = { email: user.email };
    return {accessToken: this.jwtService.sign(payload)}
  }
}
