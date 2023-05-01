import { Author } from "./author.model";

export class Book {
  id: number;
  title: string;
  price: number;
  publishDate: Date;
  amount: number;
  author: Author;
  favorite: Boolean = false;

  /**
 * Calculates the percentage change in the number of books between the current month and the previous month.
 * @param books An array of books to analyze
 * @returns The percentage change in the number of books between the current month and the previous month
 */
  static calculateBookChange(books: Book[]): number {
    // Get the current date and the first day of the current month
    const thisMonth = new Date();
    const firstDayThisMonth = new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1);

    // Get the first day of the previous month
    const lastMonth = new Date(thisMonth.getFullYear(), thisMonth.getMonth() - 1, 1);


    // Filter books based on when they were published
    const booksThisMonth = books.filter(b => new Date(b.publishDate) >= firstDayThisMonth);
    const booksLastMonth = books.filter(b => new Date(b.publishDate) >= lastMonth && new Date(b.publishDate) < firstDayThisMonth);


    // Sum the total number of books published in each time period
    const bookCountThisMonth = booksThisMonth.reduce((count, book) => count + book.amount, 0);
    const bookCountLastMonth = booksLastMonth.reduce((count, book) => count + book.amount, 0);


    // Calculate the percentage change in the number of books
    const changePercentage = bookCountLastMonth === 0 ?
      (bookCountThisMonth - bookCountLastMonth) * 100 :
      ((bookCountThisMonth - bookCountLastMonth) / bookCountLastMonth) * 100;

    // Return the percentage change
    return changePercentage;
  }



}
