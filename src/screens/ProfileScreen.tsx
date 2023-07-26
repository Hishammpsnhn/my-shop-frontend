import React, { useEffect, useState } from 'react';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUserDetails, updateUserProfile } from '../actions/userAction';
import { useAppDispatch } from '../hook';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listMyOrders } from '../actions/orderAction';
import { RxCross2 } from 'react-icons/rx';
import { MdDone } from 'react-icons/md';
import Footer from '../components/Footer';
function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<null | string>(null);

  const userDetails = useSelector((state: RootState) => state.user);
  const { error, loading, user, updateProfile } = userDetails;

  const myOrders = useSelector((state: RootState) => state.Orders);
  const { error: myOrdererror, loading: myOrderLoading, orders } = myOrders;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userDetails) {
      navigate('/login');
    } else {
      if (!user || !user.name || !user.email) {
        dispatch(listMyOrders());
        dispatch(getUserDetails());
      } else {
        dispatch(listMyOrders());
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, []);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setMessage(null);
      dispatch(updateUserProfile({ name, email, password }));
    } else setMessage('Password do not match');
  };

  return (
    <>
      <div className="container m-auto grid grid-cols-4 gap-10 px-2 max-w-[1140px] min-h-[67vh]">
        <div className="col-span-4 sm:col-span-1">
          <h2 className="text-2xl text-black font-semibold tracking-wider">
            USER PROFILE
          </h2>
          {loading ? (
            <Loader />
          ) : (
            <form className="my-5" onSubmit={(e) => handleUpdateProfile(e)}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  className={`shadow appearance-none border ${
                    message && 'border-orange-500'
                  }  rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline`}
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {message && (
                  <p className="text-red-500 text-xs italic">{message}</p>
                )}
              </div>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update
              </button>
            </form>
          )}
        </div>
        <div className="col-span-4 sm:col-span-3">
          <h2 className="text-2xl text-black font-semibold tracking-wider">
            MY ORDERS
          </h2>
          <div className="flex flex-col my-5">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  {myOrderLoading ? (
                    <Loader />
                  ) : myOrdererror ? (
                    <Message type="error">{error}</Message>
                  ) : (
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className=" border border-gray-300 bg-white font-medium">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            ID
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
                            className={`border  border-gray-300 ${
                              i % 2 === 0
                                ? 'bg-gray-200'
                                : 'bg-white hover:bg-gray-200'
                            }  `}
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {order._id}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.createdAt?.substring(0, 10)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.totalPrice}
                            </td>
                            <td
                              className={`whitespace-nowrap px-6 py-4 ${
                                order.isPaid ? 'text-green-400' : 'text-red-400'
                              } font-bold text-lg`}
                            >
                              {order.isPaid ? <MdDone /> : <RxCross2 />}
                            </td>
                            <td
                              className={`whitespace-nowrap px-6 py-4 ${
                                order.isDelivered
                                  ? 'text-green-400'
                                  : 'text-red-400'
                              } font-bold text-lg`}
                            >
                              {order.isDelivered ? <MdDone /> : <RxCross2 />}
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfileScreen;
