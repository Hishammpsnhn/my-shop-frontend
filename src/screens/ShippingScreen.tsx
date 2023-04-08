import React, { useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { useAppDispatch } from '../hook';
import { addAddress } from '../actions/cartAction';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';

function ShippingScreen() {
  //   const [address, setAddress] = useState(shippingAddress.address)
  const { shippingAddress } = useSelector((state: RootState) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <div className="w-full ">
      <CheckoutSteps step1 step2 />
      <div className="w-[45%] m-auto">
        <div className="px-10">
          <h1 className="font-serif text-3xl tracking-wider ">SHIPPING</h1>
          <div className="w-full">
            <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-3">
                <label className="block text-gray-500 text-sm tracking-wider mb-2">
                  Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-500 text-sm tracking-wider mb-2">
                  City
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-500 text-sm tracking-wider mb-2">
                  Postal Code
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  placeholder="Enter postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(parseInt(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-500 text-sm tracking-wider mb-2">
                  Country
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter country "
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
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
    </div>
  );
}

export default ShippingScreen;
