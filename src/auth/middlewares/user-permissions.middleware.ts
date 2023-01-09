import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../../user/user.service';

@Injectable()
export class UserPermissionsMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: Request, res: Response, next: () => void): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await this.userService.getUserById(Number(userId));
      if (!user.basketOwner) {
        throw new ForbiddenException();
      }
      next();
    } catch (e) {
      throw new ForbiddenException();
    }
  }
}
