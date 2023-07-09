import { orderItems } from "../model/orderModel";

// Function to extract the month from a given date
function getMonthFromDate(date: string) {
    const month = new Date(date).getMonth();
    return month;
}

// Function to group orders by month
export function groupOrdersByMonth(orders: Array<orderItems>) {
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  
    const ordersByMonth: Array<{ id: number; month: string; orders: number }> = months.map((month, index) => ({
      id: index + 1,
      month,
      orders: 0,
    }));
  
    const currentYear = new Date().getFullYear(); // Get the current year
  
    orders.forEach((orderItem) => {
      const createdAt = orderItem.createdAt;
      if (createdAt) {
        const orderYear = new Date(createdAt).getFullYear();
        if (orderYear === currentYear) {
          const month = getMonthFromDate(createdAt);
          ordersByMonth[month].orders += 1;
        }
      }
    });
  
    return ordersByMonth;
  }
  