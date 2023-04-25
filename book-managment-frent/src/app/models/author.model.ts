import { Book } from "./book.model";

export class Author {
  id: number | undefined;
  firstName: string = '';
  lastName: string = '';
  birthDate: Date;
  address: string = '';
  books?: Book[] = [];
}
