import { z, ZodType } from 'zod';

export class ReturningValidataion {
  static readonly CREATE: ZodType = z.object({
    user_code: z.string().min(1),
    book_code: z.string().min(1),
    returningDate: z.string().min(1).optional(),
  });
}
