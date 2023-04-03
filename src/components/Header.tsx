import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userAction';
import { useAppDispatch } from '../hook';
import { RootState } from '../store';
import SearchBox from './SearchBox';

function Header() {
  const [dropdown, setDropdown] = useState(false);

  const dispatch = useAppDispatch();

  const LogginedUser = useSelector((state: RootState) => state.user);

  return (
    <div className=" bg-gray-700 mb-10">
      <div className="mx-10 p-5 flex justify-between items-center ">
        <div className="flex">
          <Link to="/" className="text-white font-serif text-3xl ">
            MYSHOP
          </Link>
          <SearchBox />
        </div>
        <div className="flex items-center font-serif text-xs text-gray-400">
          <i className="flex items-center hover:opacity-50 cursor-pointer">
            <AiOutlineShoppingCart />
            <Link to={'/cart'} className="mr-5 ml-1">
              CART
            </Link>
          </i>
          {LogginedUser.user ? (
            <p
              onClick={() => setDropdown((prev) => !prev)}
              className=" ml-1 flex items-center uppercase"
            >
              {LogginedUser.user.name}
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </p>
          ) : (
            <Link to={`/register`}>
              <i className="flex items-center  hover:opacity-50 cursor-pointer">
                <CgProfile />
                <p className="ml-1">SIGN IN</p>
              </i>
            </Link>
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
                  onClick={() => dispatch(logout())}
                  className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                  role="menuitem"
                  id="menu-item-3"
                >
                  Log out
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
