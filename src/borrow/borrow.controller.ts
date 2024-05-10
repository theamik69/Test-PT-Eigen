import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowRequest, BorrowResponse } from 'src/model/borrow.model';
import { WebResponse } from 'src/model/web.model';

@Controller('borrow')
export class BorrowController {
  constructor(private borrowService: BorrowService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Body() request: BorrowRequest,
  ): Promise<WebResponse<BorrowResponse>> {
    const result = await this.borrowService.create(request);
    return {
      status: 'success',
      data: result,
    };
  }
}
