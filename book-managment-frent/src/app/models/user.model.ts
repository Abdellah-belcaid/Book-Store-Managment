import { Role } from "./role.enum";
export class User {
  id: number | undefined;
  name: string = '';
  email: string = '';
  Image_Path: string = '';
  imageData: string = '';
  username: string = '';
  password: string = '';
  token: string = '';
  createTime: Date;
  role: Role = Role.USER;

 /**
 * Calculates the percentage change in the number of users between the current month and the previous month.
 * @param users An array of users to analyze
 * @returns The percentage change in the number of users between the current month and the previous month
 */
static calculateUserChange(users: User[]): number {
  // Get the current date and the first day of the current month
  const thisMonth = new Date();
  const firstDayThisMonth = new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1);

  // Get the first day of the previous month
  const lastMonth = new Date(thisMonth.getFullYear(), thisMonth.getMonth() - 1, 1);

  // Filter users based on when they were created
  const usersThisMonth = users.filter(u => new Date(u.createTime) >= firstDayThisMonth);
  const usersLastMonth = users.filter(u => new Date(u.createTime) >= lastMonth && new Date(u.createTime) < firstDayThisMonth);

  // Count the number of users in each time period
  const userCountThisMonth = usersThisMonth.length;
  const userCountLastMonth = usersLastMonth.length;

  // Calculate the percentage change in the number of users
  const changePercentage = userCountLastMonth === 0 ?
      (userCountThisMonth - userCountLastMonth) * 100 :
      ((userCountThisMonth - userCountLastMonth) / userCountLastMonth) * 100;

  // Return the percentage change
  return changePercentage;
}

}



