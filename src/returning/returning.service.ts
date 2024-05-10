import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validataion.service';
import { ReturningRequest, ReturningResponse } from 'src/model/returning.model';
import { ReturningValidataion } from './returning.validation';
import { Saveborrowid, User } from '@prisma/client';

@Injectable()
export class ReturningService {
  constructor(
    private validation: ValidationService,
    private prismaService: PrismaService,
  ) {}

  async create(request: ReturningRequest): Promise<ReturningResponse> {
    const createRequest: ReturningRequest = this.validation.validate(
      ReturningValidataion.CREATE,
      request,
    );

    await this.checkUserMustExists(createRequest.user_code);

    const code = await this.checkUserBorrowing(
      createRequest.user_code,
      createRequest.book_code,
    );

    let returningDate;
    if (createRequest.returningDate) {
      returningDate = new Date(createRequest.returningDate);
      console.log(returningDate);
    } else {
      returningDate = new Date();
      console.log(returningDate);
    }

    const returning = await this.prismaService.borrow.update({
      where: {
        code: code.borrowId,
      },
      data: {
        returningDate,
      },
      include: {
        userId: { select: { name: true } },
        bookId: { select: { title: true, author: true } },
      },
    });

    if (returning) {
      await this.updateBookAvailable(createRequest.book_code);
      await this.updateUserBorrowing(createRequest.user_code);
      await this.deleteSaveBorrowId(code.code);
      await this.intoBlacklistCheck(
        createRequest.user_code,
        returning.borrowDate,
        returning.returningDate,
      );
    }

    const dateObject = new Date(returning.returningDate);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const date = dateObject.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${date}`;

    const userName = returning.userId.name;
    const bookTitleName = returning.bookId.title;
    const bookAuthor = returning.bookId.author;
    const result = {
      code: returning.code,
      user_code: returning.userCode,
      user_name: userName,
      book_code: returning.bookCode,
      book_title: bookTitleName,
      book_author: bookAuthor,
      returning_date: formattedDate,
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

  async checkUserBorrowing(
    userCode: string,
    bookCode: string,
  ): Promise<Saveborrowid> {
    const code = await this.prismaService.saveborrowid.findFirst({
      where: {
        userCode,
        bookCode,
      },
    });

    if (!code) {
      throw new HttpException('Not books borrowed.', 404);
    }

    return code;
  }

  async intoBlacklistCheck(
    user: string,
    borrowDate: Date,
    returningDate: Date,
  ): Promise<void> {
    const days = Math.ceil(
      (returningDate.getTime() - borrowDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (days > 7) {
      await this.prismaService.blacklist.create({
        data: {
          userCode: user,
        },
      });
    }
  }

  async updateBookAvailable(code: string): Promise<void> {
    await this.prismaService.book.update({
      where: {
        code,
      },
      data: {
        available: true,
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
          decrement: 1,
        },
      },
    });
  }

  async deleteSaveBorrowId(code: number): Promise<void> {
    await this.prismaService.saveborrowid.delete({
      where: {
        code,
      },
    });
  }
}
