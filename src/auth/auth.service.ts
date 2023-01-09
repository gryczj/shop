import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/auth.models';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/dto/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const { email, pwd, name, basketOwner } = registerDto;
    const rounds = 10;
    const hash = await bcrypt.hash(pwd, rounds);
    return await this.userService.saveUser(email, hash, name, basketOwner);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const passwordValid = await bcrypt.compare(password, user.pwd);
    if (!passwordValid) {
      return null;
    }

    return user;
  }

  async login(email: string): Promise<string> {
    const payload = { email };
    return this.jwtService.sign(payload);
  }
}
