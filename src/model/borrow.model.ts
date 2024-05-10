import { ApiProperty } from '@nestjs/swagger';

export class BorrowRequest {
  @ApiProperty()
  user_code: string;

  @ApiProperty()
  book_code: string;
}

export class BorrowResponse {
  code: number;
  user_code: string;
  user_name: string;
  book_code: string;
  book_title: string;
  book_author: string;
  boorrowing_date: string;
}
