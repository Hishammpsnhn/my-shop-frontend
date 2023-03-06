import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';

function Header() {
  const [user, setuser] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className=" bg-gray-700">
      <div className="mx-10 p-5 flex justify-between items-center ">
        <div className="flex">
          <h1 className="text-white font-serif text-3xl ">MYSHOP</h1>
          <div className="flex ">
            <input
              type="text"
              className="bg-white border border-gray-300 text-gray-900 ml-10 mr-5 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-black dark:placeholder-gray-500 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="eg: iphone"
            />
            <button className=" bg-transparent hover:bg-blue-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              search
            </button>
          </div>
        </div>
        <div className="flex items-center font-serif text-xs text-gray-400">
          <i className="flex items-center hover:opacity-50 cursor-pointer">
            <AiOutlineShoppingCart />
            <p className="mr-5 ml-1">CART</p>
          </i>
          {user ? (
            <p
              onClick={() => setDropdown((prev) => !prev)}
              className=" ml-1 flex items-center uppercase"
            >
              HISHAM
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </p>
          ) : (
            <i className="flex items-center  hover:opacity-50 cursor-pointer">
              <CgProfile />
              <p className="ml-1">SIGN IN</p>
            </i>
          )}
          {dropdown && (
            <div
              onClick={() => setDropdown(false)}
              className="absolute right-5 top-14 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                <button
                  onClick={() => setuser(false)}
                  className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                  role="menuitem"
                  id="menu-item-3"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
