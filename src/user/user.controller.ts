import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './dto/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
