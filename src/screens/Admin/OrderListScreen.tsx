import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useAppDispatch } from '../../hook';
import { Link, useNavigate } from 'react-router-dom';
import { listAllOrders } from '../../actions/orderAction';
import { MdDone } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Footer from '../../components/Footer';

function OrderListScreen() {
  const userInfo = useSelector((state: RootState) => state.user.user);

  const allOrders = useSelector((state: RootState) => state.Orders);
  const { error, loading, orders } = allOrders;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders());
    } else {
      navigate('/login');
    }
  }, [userInfo, dispatch]);
  return (
    <>
      <div className="container m-auto px-2 overflow-hidden max-w-[1140px] min-h-[67vh]">
        <h1 className="uppercase  text-3xl font-sans py-5 tracking-widest">
          ORDERS
        </h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : (
          <div className='overflow-x-scroll'>
            <table className="min-w-full text-left text-sm font-light">
              <thead className=" border border-gray-300 bg-white font-medium">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-4">
                    USER
                  </th>
                  <th scope="col" className="px-6 py-4">
                    DATE
                  </th>
                  <th scope="col" className="px-6 py-4">
                    TOTAL
                  </th>
                  <th scope="col" className="px-6 py-4">
                    PAID
                  </th>
                  <th scope="col" className="px-6 py-4">
                    DELIVERED
                  </th>
                  <th scope="col" className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order, i) => (
                  <tr
                    key={i}
                    className={`border  border-gray-300 ${i % 2 === 0 ? 'bg-gray-200' : 'bg-white hover:bg-gray-200'
                      }  `}
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {order._id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {order.user?.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {order.createdAt?.substring(0, 10)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {order.totalPrice}
                    </td>
                    <td
                      className={`whitespace-nowrap px-6 py-4 ${order.isPaid ? 'text-green-400' : 'text-red-400 text-lg'
                        } font-bold `}
                    >
                      {order.isPaid ? order.paidAt?.substring(0, 10) : <RxCross2 />}
                    </td>
                    <td
                      className={`whitespace-nowrap px-6 py-4 ${order.isDelivered
                        ? 'text-green-400'
                        : 'text-red-400 text-lg'
                        } font-bold `}
                    >
                      {order.isDelivered ? (
                        order.deliveredAt?.substring(0, 10)
                      ) : (
                        <RxCross2 />
                      )}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <Link
                        to={`/order/${order._id}`}
                        className="bg-white p-2 font-normal hover:bg-slate-200"
                      >
                        DETAILS
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default OrderListScreen;
