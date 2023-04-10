import React, { useEffect, useState } from 'react';
import Message from '../components/Message';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../hook';
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from '../actions/orderAction';
import Loader from '../components/Loader';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import { resetOrder } from '../Reducers/orderReducer';

function OrderScreen() {
  const [sdkReady, setSdkReady] = useState(true);

  const orderDetails = useSelector((state: RootState) => state.order);
  const { order, loading, error ,success} = orderDetails;

  const orderPay = useSelector((state: RootState) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const user = useSelector((state: RootState) => state.user.user);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const orderId = params.id;

  let itemsPrice = 0;

  if (!loading && order?.orderItems) {
    //   Calculate prices
    const addDecimals = (num: number) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    itemsPrice = parseInt(
      addDecimals(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )
    );
  }

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    // const addPayPalScript = async () => {
    //     const { data: clientId } = await axios.get('/api/config/paypal')
    //     const script = document.createElement('script')
    //     script.type = 'text/javascript'
    //     script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
    //     script.async = true
    //     script.onload = () => {
    //         setSdkReady(true)
    //     }
    //     document.body.appendChild(script)
    // }

    if (!order || orderId !== order._id) {
      if (orderId) {
        dispatch(getOrderDetails(orderId));
      }
    }
  }, [order, orderId, dispatch]);

  const successPaymentHandler = (paymentResult: any) => {
    if (orderId) {
      dispatch(payOrder(orderId, paymentResult));
    }
  };

  const deliverHandler = () => {
    if (order) {
      dispatch(deliverOrder(order));
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error">{error}</Message>
  ) : (
    <div className="container m-auto">
        <div className="px-5  text-gray-500">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-8/12 md:pr-6">
              <h1 className="text-black font-semibold tracking-wider xs:text-3xl text-lg">
                ORDER {order?._id}
              </h1>
              <ul className="divide-y divide-gray-200">
                <li className="py-4">
                  <h2 className="text-2xl text-gray-600 font-semibold tracking-wider pb-4">
                    SHIPPING
                  </h2>
                  <p className="text-sm pb-3">
                    <strong>Name:</strong>
                    {order?.user?.name}{' '}
                  </p>
                  <p className="text-sm pb-3">
                    <strong>Email:</strong> {order?.user?.email}{' '}
                  </p>
                  <p className="text-sm pb-3">
                    <strong>Address:</strong>
                    {order?.shippingAddress.address},
                    {order?.shippingAddress.city},
                    {order?.shippingAddress.postalCode},
                    {order?.shippingAddress.city}{' '}
                  </p>
                  {order?.isDelivered && order?.deliveredAt ? (
                    <Message type="info">
                      Delivered on {order?.deliveredAt}{' '}
                    </Message>
                  ) : (
                    <Message type="error">Not Delivered</Message>
                  )}
                </li>
                <li className="py-4">
                  <h2 className="text-2xl font-semibold text-gray-600 pb-4">
                    Payment Method
                  </h2>
                  <p className="text-sm pb-3">
                    <strong>Method: {order?.paymentMethod}</strong>
                  </p>
                  {!order?.isPaid && <Message type="error">Not Paid</Message>}
                </li>
                <li className="py-4">
                  <h2 className="text-2xl font-semibold text-gray-600">
                    Order Items
                  </h2>
                  <ul className="divide-y divide-gray-200">
                    {order?.orderItems.map((item, index) => (
                      <li key={index} className="py-4 sm:flex ">
                        <div className="sm:w-16">
                          <img
                            className="rounded-lg"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div className="flex-grow sm:pl-4">
                          <Link to={`/product/${item.id}`}>
                            <h3 className="text-base font-medium hover:underline cursor-pointer">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500">
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
            <form className="md:w-[35%] h-fit border border-gray-300 rounded-md shadow-lg ">
              <div className="bg-gray-200 rounded-t-md px-4 py-2">
                <h2 className="text-2xl font-semibold text-gray-600">
                  Order Summary
                </h2>
              </div>
              <ul className="divide-y divide-gray-300">
                <li className="flex justify-between py-2 px-4">
                  <span>Items</span>
                  <span>${itemsPrice}</span>
                </li>
                <li className="flex justify-between py-2 px-4">
                  <span>Shipping</span>
                  <span>${order?.shippingPrice}</span>
                </li>
                <li className="flex justify-between py-2 px-4">
                  <span>Tax</span>
                  <span>${order?.taxPrice}</span>
                </li>
                <li className="flex justify-between py-2 px-4">
                  <span>Total</span>
                  <span>${order?.totalPrice}</span>
                </li>
                <li className="py-4 px-6">
                  {!order?.isPaid && (
                    <div>
                      {loadingPay && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={itemsPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </div>
                  )}
                  {loading && <Loader />}
                  {user &&
                    user?.isAdmin &&
                    order?.isPaid &&
                    !order?.isDelivered && (
                      <li>
                        <button
                          type="button"
                          className="bg-black w-full p-2.5 text-white text-center hover:bg-slate-800"
                          onClick={deliverHandler}
                        >
                          Mark As Delivered
                        </button>
                      </li>
                    )}
                </li>
              </ul>
            </form>
          </div>
      </div>
    </div>
  );
}

export default OrderScreen;
