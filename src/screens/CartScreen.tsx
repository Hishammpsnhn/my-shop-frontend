import React from "react";
import { AiFillDelete } from "react-icons/ai";

function CartScreen() {
  return (
    <div className="mx-40 flex justify-between">
      <div className="w-[50%]">
        <h1 className="text-4xl p-5">SHOPPING CART</h1>
        <div className="ml-10 flex justify-between text-gray-500">
          <img className="w-20 h-20" src="https://www.shutterstock.com/shutterstock/photos/1811246308/display_1500/stock-vector-sample-stamp-in-rubber-style-red-round-grunge-sample-sign-rubber-stamp-on-white-vector-1811246308.jpg" alt="image" />
          <p className="w-[25%] hover:underline cursor-pointer">Cannon EOS 80D DSLR Camera</p>
          <p>$ 199</p>
          <select defaultValue={1} id="countries" className=" border border-gray-300 w-20  block  p-2.5 h-11 bg-slate-200">
            <option value="1" >1</option>
            <option value="2" >2</option>
            <option value="3">3</option>
          </select>
          <button className="hover:bg-gray-200 w-20 h-11 text-xl flex items-center justify-center">
            <AiFillDelete />
          </button>
        </div>
      </div>
      <div className="  mt-5">
        <div className="border border-gray-400 ">
          <div className="p-4">
            <h2 className="text-2xl text-gray-700 tracking-widest mb-3">SUBTOTAL (1) ITEMS</h2>
            <p>$356.2</p>
          </div>
          <div className="border border-t-gray-400 w-full px-4 py-2">
            <button className="bg-black w-[350px] p-4 text-white text-xs tracking-wider font-semibold ">PORCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
