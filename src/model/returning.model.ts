import { ApiProperty } from '@nestjs/swagger';

export class ReturningRequest {
  @ApiProperty()
  user_code: string;

  @ApiProperty()
  book_code: string;

  returningDate?: string;
}

export class ReturningResponse {
  code: number;
  user_code: string;
  user_name: string;
  book_code: string;
  book_title: string;
  book_author: string;
  returning_date: string;
}
