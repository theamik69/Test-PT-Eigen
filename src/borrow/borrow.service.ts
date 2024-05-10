import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validataion.service';
import { BorrowRequest, BorrowResponse } from '../model/borrow.model';
import { BorrowValidataion } from './borrow.validation';
import { User } from '@prisma/client';

@Injectable()
export class BorrowService {
  constructor(
    private validation: ValidationService,
    private prismaService: PrismaService,
  ) {}

  async create(request: BorrowRequest): Promise<BorrowResponse> {
    const createRequest: BorrowRequest = this.validation.validate(
      BorrowValidataion.CREATE,
      request,
    );

    await this.checkUserMustExists(createRequest.user_code);

    await this.checkUserInBlacklist(createRequest.user_code);

    await this.checkBookAvailable(createRequest.book_code);

    await this.checkUserBorrowing(createRequest.user_code);

    const borrowDate = new Date();

    const user = createRequest.user_code;
    const bookId = createRequest.book_code;

    const borrow = await this.prismaService.borrow.create({
      data: {
        userId: { connect: { code: user } },
        bookId: { connect: { code: bookId } },
        borrowDate,
      },
      include: {
        userId: { select: { name: true } },
        bookId: { select: { title: true, author: true } },
      },
    });

    if (borrow) {
      await this.updateBookAvailable(bookId);
      await this.updateUserBorrowing(user);
      await this.createSaveBorrowId(user, bookId, borrow.code);
    }

    const dateObject = new Date(borrow.borrowDate);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const date = dateObject.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${date}`;

    const userName = borrow.userId.name;
    const bookTitleName = borrow.bookId.title;
    const bookAuthor = borrow.bookId.author;
    const result = {
      code: borrow.code,
      user_code: borrow.userCode,
      user_name: userName,
      book_code: bookId,
      book_title: bookTitleName,
      book_author: bookAuthor,
      boorrowing_date: formattedDate,
    };

    return result;
  }

  async checkUserMustExists(code: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        code,
      },
    });

    if (!user) {
      throw new HttpException('User is not found', 404);
    }

    return user;
  }

  async checkUserInBlacklist(userCode: string): Promise<void> {
    const user = await this.prismaService.blacklist.findFirst({
      where: {
        userCode,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (user) {
      const currentTime = new Date().getTime();
      const userTime = new Date(user.createdAt).getTime();
      const dayDifference = (currentTime - userTime) / (1000 * 60 * 60 * 24);

      if (dayDifference > 3) {
        await this.prismaService.blacklist.delete({
          where: {
            code: user.code,
          },
        });
      } else {
        throw new ForbiddenException('User is in blacklist');
      }
    }
  }

  async checkBookAvailable(code: string): Promise<void> {
    const book = await this.prismaService.book.findFirst({
      where: {
        code,
      },
    });

    if (book.available === false) {
      throw new ForbiddenException('Book is not available');
    }
  }

  async checkUserBorrowing(userCode: string): Promise<void> {
    const user = await this.prismaService.user.findFirst({
      where: {
        code: userCode,
      },
    });

    if (user.borrowing == 2) {
      throw new ForbiddenException('User has borrowing limit');
    }
  }

  async updateBookAvailable(code: string): Promise<void> {
    await this.prismaService.book.update({
      where: {
        code,
      },
      data: {
        available: false,
      },
    });
  }

  async updateUserBorrowing(userCode: string): Promise<void> {
    await this.prismaService.user.update({
      where: {
        code: userCode,
      },
      data: {
        borrowing: {
          increment: 1,
        },
      },
    });
  }

  async createSaveBorrowId(
    userCode: string,
    bookCode: string,
    borrowId: number,
  ): Promise<void> {
    await this.prismaService.saveborrowid.create({
      data: {
        userCode,
        bookCode,
        borrowId,
      },
    });
  }
}
