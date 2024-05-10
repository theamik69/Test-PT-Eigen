import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ReturningService } from './returning.service';
import { ReturningRequest, ReturningResponse } from 'src/model/returning.model';
import { WebResponse } from 'src/model/web.model';

@Controller('returning')
export class ReturningController {
  constructor(private returningService: ReturningService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Body() request: ReturningRequest,
  ): Promise<WebResponse<ReturningResponse>> {
    const result = await this.returningService.create(request);
    return {
      status: 'success',
      data: result,
    };
  }
}
