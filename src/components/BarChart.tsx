import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { orderItems } from '../model/orderModel';
import { groupOrdersByMonth } from '../utils/orderSepperation';
ChartJS.register(...registerables);

const BarChart = ({ orders }: any) => {
  const [userData, setUserData] = useState({
    labels: groupOrdersByMonth(orders).map(
      (data: { id: number; month: string; orders: number }) => data.month
    ),
    datasets: [
      {
        label: 'Orders 2023',
        data: groupOrdersByMonth(orders).map(
          (data: { id: number; month: string; orders: number }) => data.orders
        ),
        backgroundColor: [
          'rgba(75,192,192,1)',
          '#ecf0f1',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0',
        ],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });

  return <Bar data={userData} />;
};

export default BarChart;
