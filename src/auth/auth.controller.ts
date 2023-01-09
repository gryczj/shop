import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './jwt/local-auth.guard';
import { RegisterDto } from './dto/auth.models';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<{ code: number; response: string }> {
    try {
      await this.authService.register(registerDto);
    } catch (e) {
      throw Error(e);
    }
    return {
      code: 200,
      response: 'User registered.',
    };
  }

  /**
   *
   * Add valid token to new table in db then checking in guard
   */
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req): Promise<{ accessToken: string }> {
    return {
      accessToken: await this.authService.login(req.user),
    };
  }

  /**
   *
   * Remove token from table with valid tokens
   */
  @Post('/logout')
  async logout(@Req() req): Promise<{ code: number; response: string }> {
    return {
      code: 200,
      response: 'User logout.',
    };
  }
}
