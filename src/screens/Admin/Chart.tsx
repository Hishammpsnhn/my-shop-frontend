import React,{useEffect, useState} from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hook";
import { useNavigate } from "react-router-dom";
import { listAllOrders } from "../../actions/orderAction";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
import BarChart from "../../components/BarChart";
import { orderItems } from "../../model/orderModel";
import Loader from "../../components/Loader";
ChartJS.register(...registerables);


const Charts = () => {


  
  const userInfo = useSelector((state: RootState) => state.user.user);
  const allOrders = useSelector((state: RootState) => state.Orders);

  const { error, loading, orders } = allOrders;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();



  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if(orders.length === 0) {
        dispatch(listAllOrders());
      }
    } else {
      navigate('/login');
    }
  }, [userInfo, dispatch,navigate,orders]);
  


  return    <div className="container m-auto px-2 overflow-hidden max-w-[1140px] min-h-[67vh]">
    { loading?(
      <Loader/>
    ):(
     <BarChart orders={orders} />
    )}
  </div>;
};

export default Charts;
