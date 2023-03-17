import { Author } from "./author.model";

export class Book {
  id: number;
  title: string;
  price: number;
  publishDate: Date;
  amount: number;
  author: Author;
}
