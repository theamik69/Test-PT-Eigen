import { Controller, Get, HttpCode } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResponse } from 'src/model/book.model';
import { WebResponse } from 'src/model/web.model';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  @HttpCode(200)
  async getBooks(): Promise<WebResponse<BookResponse[]>> {
    const books = await this.bookService.getBooks();

    return {
      status: 'success',
      amount_of_books: books.length,
      data: books,
    };
  }
}
