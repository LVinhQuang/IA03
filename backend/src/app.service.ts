import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import * as bcrypt from 'bcrypt'
import { HttpException, HttpStatus } from '@nestjs/common';
import path = require('path');

interface User {
  email: string,
  password: string
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async register(email: string, password: string): Promise<{message: string}> {
    const filePath = path.resolve(__dirname, '../src/users.JSON')
    const users: User[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    console.log(users);
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      throw new HttpException('Email đã tồn tại', HttpStatus.CONFLICT);
    }
    const saltRounds = 10; // Độ mạnh của hash
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    users.push({ email, password: hashedPassword });
    fs.writeFileSync(filePath, JSON.stringify(users), 'utf-8');

    return {message: "Đăng ký thành công"}
  }

  async login(email: string, password: string) {
    const filePath = path.resolve(__dirname, '../src/users.JSON')
    const users: User[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const user = users.find(user => user.email === email);
    if (!user) {
      throw new HttpException('Email không tồn tại', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException('Mật khẩu không đúng', HttpStatus.UNAUTHORIZED);
    }

    return {message: "Đăng nhập thành công!"}
  }
}
