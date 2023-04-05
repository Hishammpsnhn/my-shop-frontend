import React, { useEffect } from "react";
import Message from "../components/Message";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../hook";
import { getOrderDetails } from "../actions/orderAction";

function OrderScreen() {
    const order = useSelector((state: RootState) => state.order.order);
    const user = useSelector((state: RootState) => state.user.user);
    console.log(order)

    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const orderId = params.id;
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        if (!order || orderId !== order._id) {
            if (orderId) {
                dispatch(getOrderDetails(orderId))
            }
        }

    }, [order]);

    return (
        <div className="w-full">
            <div className="w-[75%] m-auto">
                <div className="px-10  text-gray-500">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-8/12 md:pr-6">
                            <h1 className="text-black font-semibold tracking-wider text-3xl">ORDER {order?._id}</h1>
                            <ul className="divide-y divide-gray-200">
                                <li className="py-4">
                                    <h2 className="text-2xl text-gray-600 font-semibold tracking-wider pb-4">SHIPPING</h2>
                                    <p className="text-sm pb-3">
                                        <strong>Name:</strong>{order?.user?.name} {' '}
                                    </p>
                                    <p className="text-sm pb-3">
                                        <strong>Email:</strong> {order?.user?.email} {' '}
                                    </p>
                                    <p className="text-sm pb-3">
                                        <strong>Address:</strong>
                                        {order?.shippingAddress.address},
                                        {order?.shippingAddress.city},
                                        {order?.shippingAddress.postalCode},
                                        {order?.shippingAddress.city} {' '}
                                    </p>

                                    <Message type="error">Not Delivered</Message>
                                </li>

                                <li className="py-4">
                                    <h2 className="text-2xl font-semibold text-gray-600 pb-4">Payment Method</h2>
                                    <p className="text-sm pb-3">
                                        <strong>Method: {order?.paymentMethod}</strong>
                                    </p>
                                    <Message type="error">Not Paid</Message>
                                </li>

                                <li className="py-4">
                                    <h2 className="text-2xl font-semibold text-gray-600">Order Items</h2>

                                    <ul className="divide-y divide-gray-200">
                                        {order?.orderItems.map((item, index) => (
                                            <li key={index} className="py-4 flex ">
                                                <div className="w-16">
                                                    <img
                                                        className="rounded-lg"
                                                        src={item.image}
                                                        alt={item.name}
                                                    />
                                                </div>
                                                <div className="flex-grow pl-4">
                                                    <Link to={`/product/${item.id}`}>
                                                        <h3 className="text-sm font-medium hover:underline cursor-pointer">
                                                            {item.name}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-sm text-gray-500">
                                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}

                                    </ul>

                                </li>
                            </ul>
                        </div>


                        <form className="w-[35%] h-fit border border-gray-300 rounded-md shadow-lg "
                        // onSubmit={(e) => hadlePlaceOrder(e)}
                        >
                            <div className="bg-gray-200 rounded-t-md px-4 py-2">
                                <h2 className="text-2xl font-semibold text-gray-600">Order Summary</h2>
                            </div>
                            <ul className="divide-y divide-gray-300">
                                <li className="flex justify-between py-2 px-4">
                                    <span>Items</span>
                                    <span>${order?.itemsPrice}</span>
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
                                {/* {error && (
                            <li className="py-2 px-4">
                                <Message variant="danger">{error}</Message>
                            </li>
                        )} */}
                                <li className="py-4 px-6">
                                    <button
                                        type="submit"
                                    // className={`w-full py-2 ${cart.cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black opacity-80 hover:opacity-90'
                                    //     } text-white rounded-md ${cart.cartItems.length === 0 ? 'cursor-not-allowed' : 'hover:shadow-lg'
                                    //     }`}
                                    // disabled={cart.cartItems.length === 0}
                                    // onClick={placeOrderHandler}
                                    >
                                        Place Order
                                    </button>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderScreen;
