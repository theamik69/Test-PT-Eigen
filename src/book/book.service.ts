import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { BookResponse } from 'src/model/book.model';

@Injectable()
export class BookService {
  constructor(private prismaService: PrismaService) {}

  async getBooks(): Promise<BookResponse[]> {
    const books = await this.prismaService.book.findMany({
      where: {
        available: true,
      },
    });
    return books.map((book) => {
      return {
        code: book.code,
        title: book.title,
        author: book.author,
        stock: book.stock,
      };
    });
  }
}
