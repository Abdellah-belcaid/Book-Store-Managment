export class Purchase {
  id: number | undefined;
  userId: number | undefined;
  bookId: number | undefined;
  price: number | undefined;
  purchaseTime: Date = new Date();
  constructor(userId?: number, bookId?: number, price?: number) {
    this.bookId = bookId;
    this.userId = userId;
    this.price = price;
  }
  /**

Calculates the percentage change in the number of purchases between the current month and the previous month.
@param purchases An array of purchases to analyze
@returns The percentage change in the number of purchases between the current month and the previous month
*/
  static calculatePurchaseChange(purchases: Purchase[]): number {
    // Get the current date and the first day of the current month
    const thisMonth = new Date();
    const firstDayThisMonth = new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1);
    // Get the first day of the previous month
    const lastMonth = new Date(thisMonth.getFullYear(), thisMonth.getMonth() - 1, 1);

    // Filter purchases based on when they were made
    const purchasesThisMonth = purchases.filter(p => new Date(p.purchaseTime) >= firstDayThisMonth);
    const purchasesLastMonth = purchases.filter(p => new Date(p.purchaseTime) >= lastMonth && new Date(p.purchaseTime) < firstDayThisMonth);

    // Count the number of purchases in each time period
    const purchaseCountThisMonth = purchasesThisMonth.length;
    const purchaseCountLastMonth = purchasesLastMonth.length;

    // Calculate the percentage change in the number of purchases
    const changePercentage = purchaseCountLastMonth === 0 ?
      purchaseCountThisMonth * 100 :
      ((purchaseCountThisMonth - purchaseCountLastMonth) / purchaseCountLastMonth) * 100;

    // Return the percentage change
    return changePercentage;
  }



}
