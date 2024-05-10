import { z, ZodType } from 'zod';

export class BorrowValidataion {
  static readonly CREATE: ZodType = z.object({
    user_code: z.string().min(1),
    book_code: z.string().min(1),
  });
}
