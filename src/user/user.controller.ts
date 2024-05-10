import { Controller, Get, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponse } from 'src/model/user.model';
import { WebResponse } from 'src/model/web.model';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(200)
  async getUsers(): Promise<WebResponse<UserResponse[]>> {
    const users = await this.userService.getUsers();
    return {
      status: 'success',
      total_users: users.length,
      data: users,
    };
  }
}
