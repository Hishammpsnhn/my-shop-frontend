import React, { useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartAction';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../hook';
import { resetUpdateOrder } from '../Reducers/productDetailsReducer';

function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitHandler = () => {
    dispatch(savePaymentMethod(paymentMethod));
    dispatch(resetUpdateOrder())
    navigate('/placeorder');
  };

  return (
    <div className="w-full">
      <CheckoutSteps step1 step2 step3 />
      <div className="w-[45%] m-auto flex justify-start">
        <div>
          <h1 className="font-serif text-3xl tracking-wider ">
            Payment Method
          </h1>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <span className="text-lg font-bold mb-2 block">
                Select Method
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center">
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    className="form-radio"
                    name="paymentMethod"
                    value="PayPal"
                    checked
                    //onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-2">PayPal or Credit Card</span>
                </label>
                {/* <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        name="paymentMethod"
                                        value="Stripe"
                                        //onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <span className="ml-2">Stripe</span>
                                </label> */}
              </div>
            </div>
            <button
              type="submit"
              className="bg-black text-white text-xs px-6 py-4 tracking-wide"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentScreen;
