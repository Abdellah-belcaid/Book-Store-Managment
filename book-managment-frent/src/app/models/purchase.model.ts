export class Purchase {
  id: number | undefined;
  userId: number | undefined;
  bookId: number | undefined;
  price: number | undefined;
  purchasetime: Date = new Date();
  constructor(userId?: number, bookId?: number, price?: number) {
    this.bookId = bookId;
    this.userId = userId;
    this.price = price; 
  }
}
