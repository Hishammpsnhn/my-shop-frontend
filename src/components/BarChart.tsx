import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import { orderItems } from "../model/orderModel";
ChartJS.register(...registerables);

const BarChart = ({orders}:any) => {
    // Function to extract the month from a given date
function getMonthFromDate(date: string) {
    const month = new Date(date).getMonth();
    return month;
}

// Function to group orders by month
 function groupOrdersByMonth(orders: Array<orderItems>) {
  console.log(orders)
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    
    const ordersByMonth: Array<{ id: number; month: string; orders: number }> = months.map((month, index) => ({
      id: index + 1,
      month,
      orders: 0,
    }));
    
    const currentYear = new Date().getFullYear(); // Get the current year
    if(orders.length > 0) { 
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
    }
    return ordersByMonth;
  
  }

    
  const [userData, setUserData] = useState({
    labels: groupOrdersByMonth(orders).map((data: { id: number; month: string; orders: number }) => data.month),
    datasets: [
      {
        label: "Orders 2023",
        data: groupOrdersByMonth(orders).map((data:{ id: number; month: string; orders: number }) => data.orders),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
 
  return  <Bar data={userData} />;
};

export default BarChart;
