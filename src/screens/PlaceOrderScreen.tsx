import React, { useEffect } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { addPrices } from "../Reducers/cartReducer";
import { useAppDispatch } from "../hook";
import { createOrder, getOrderDetails } from "../actions/orderAction";
import { resetOrder } from "../Reducers/orderReducer";

function PlaceOrderScreen() {

    const cart = useSelector((state: RootState) => state.cart);
    const orderCreate = useSelector((state: RootState) => state.order);
    const { error, loading, success, order } = orderCreate;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    if (!cart.shippingAddress) {
        navigate('/shipping')
    } else if (!cart.paymentMethod) {
        navigate('/payment')
    }

    //   Calculate prices
    const addDecimals = (num: number) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    const itemsPrice = parseInt(addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)))
    const shippingPrice = parseInt(addDecimals(itemsPrice > 100 ? 0 : 100))
    const taxPrice = parseInt(addDecimals(Number((0.15 * itemsPrice).toFixed(2))))
    const totalPrice = parseInt((
        itemsPrice + shippingPrice + taxPrice
    ).toFixed(2))

    useEffect(() => {
        if (success && order?._id) {
            dispatch(getOrderDetails(order._id))
            navigate(`/order/${order._id}`)
        }
    }, [orderCreate])

    const hadlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(addPrices({ itemsPrice, shippingPrice, totalPrice, taxPrice }))
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice,
        }))
    }

    return (
        <div className="w-full">
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="w-[75%] m-auto">
                <div className="px-10  text-gray-500">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-8/12 md:pr-6">
                            <ul className="divide-y divide-gray-200">

                                <li className="py-4">
                                    <h2 className="text-2xl text-gray-600 font-semibold tracking-wider">SHIPPING</h2>
                                    <p className="text-sm">
                                        <strong>Address:</strong> {cart.shippingAddress.address},{' '}
                                        {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
                                        {cart.shippingAddress.country}
                                    </p>
                                </li>

                                <li className="py-4">
                                    <h2 className="text-2xl font-semibold text-gray-600">Payment Method</h2>
                                    <p className="text-sm">
                                        <strong>Method: </strong>
                                        {cart.paymentMethod}
                                    </p>
                                </li>

                                <li className="py-4">
                                    <h2 className="text-2xl font-semibold text-gray-600">Order Items</h2>
                                    {cart.cartItems.length === 0 ? (
                                        <Message type="info">Your cart is empty</Message>
                                    ) : (
                                        <ul className="divide-y divide-gray-200">
                                            {cart.cartItems.map((item, index) => (
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
                                    )}
                                </li>
                            </ul>
                        </div>


                        <form className="w-[35%] h-fit border border-gray-300 rounded-md shadow-lg " onSubmit={(e) => hadlePlaceOrder(e)}>
                            <div className="bg-gray-200 rounded-t-md px-4 py-2">
                                <h2 className="text-2xl font-semibold text-gray-600">Order Summary</h2>
                            </div>
                            <ul className="divide-y divide-gray-300">
                                <li className="flex justify-between py-2 px-4">
                                    <span>Items</span>
                                    <span>${itemsPrice}</span>
                                </li>
                                <li className="flex justify-between py-2 px-4">
                                    <span>Shipping</span>
                                    <span>${shippingPrice}</span>
                                </li>
                                <li className="flex justify-between py-2 px-4">
                                    <span>Tax</span>
                                    <span>${taxPrice}</span>
                                </li>
                                <li className="flex justify-between py-2 px-4">
                                    <span>Total</span>
                                    <span>${totalPrice}</span>
                                </li>
                                {/* {error && (
                                    <li className="py-2 px-4">
                                        <Message variant="danger">{error}</Message>
                                    </li>
                                )} */}
                                <li className="py-4 px-6">
                                    <button
                                        type="submit"
                                        className={`w-full py-2 ${cart.cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black opacity-80 hover:opacity-90'
                                            } text-white rounded-md ${cart.cartItems.length === 0 ? 'cursor-not-allowed' : 'hover:shadow-lg'
                                            }`}
                                        disabled={cart.cartItems.length === 0}
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
    )
}

export default PlaceOrderScreen;
