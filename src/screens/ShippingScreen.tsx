import React, { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";



function ShippingScreen() {
    //   const [address, setAddress] = useState(shippingAddress.address)
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [country, setCountry] = useState("")
    return (
        <div className="w-full ">
            <div className="w-[40%] m-auto">
                <div className="px-10">
                    <CheckoutSteps step1 />
                    <h3 className="font-serif text-3xl tracking-wider ">SHIPPING</h3>
                    <div className="w-full">
                        <form
                            className="mt-5"
                        // onSubmit={(e) => handleSubmit(e)}
                        >
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
                                    onChange={(e) => setPostalCode(e.target.value)}
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
                            <button type="submit" className="bg-black text-white text-xs px-6 py-4 tracking-wide" >CONTINUE</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShippingScreen;
