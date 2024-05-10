import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { UserResponse } from 'src/model/user.model';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUsers(): Promise<UserResponse[]> {
    const users = await this.prismaService.user.findMany();

    return users.map((user) => {
      return {
        code: user.code,
        name: user.name,
        borrowing: user.borrowing,
      };
    });
  }
}
