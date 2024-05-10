import { Module } from '@nestjs/common';
import { ReturningController } from './returning.controller';
import { ReturningService } from './returning.service';

@Module({
  controllers: [ReturningController],
  providers: [ReturningService]
})
export class ReturningModule {}
