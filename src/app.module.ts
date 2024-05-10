import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { BorrowModule } from './borrow/borrow.module';
import { ReturningModule } from './returning/returning.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CommonModule, BorrowModule, ReturningModule, BookModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
