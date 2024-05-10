export class WebResponse<T> {
  status: string;
  amount_of_books?: number;
  total_users?: number;
  data?: T;
  errors?: string;
}
