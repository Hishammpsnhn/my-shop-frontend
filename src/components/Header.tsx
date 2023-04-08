import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IoMdArrowDropdown } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../actions/userAction';
import { useAppDispatch } from '../hook';
import { RootState } from '../store';
import SearchBox from './SearchBox';
import { Menu, Transition } from '@headlessui/react';
import { userInfo } from 'os';

function Header() {
  const [dropdown, setDropdown] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);
  const { user: userInfo } = user;

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
          {userInfo ? (
            <Menu>
              {({ open }) => (
                <>
                  <Menu.Button className="flex items-center">
                    <CgProfile />
                    <div className="mr-2 ml-1 items-center text-center uppercase flex">
                      {userInfo?.name}
                    </div>
                    <IoMdArrowDropdown />
                  </Menu.Button>

                  <Transition
                    show={open}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="py-1">
                        {userInfo && (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700'
                                  } block px-4 py-2 text-sm w-full text-left`}
                                  onClick={() => navigate('/profile')}
                                >
                                  Profile
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700'
                                  } block px-4 py-2 text-sm w-full text-left`}
                                  onClick={() => logout(dispatch)}
                                >
                                  Logout
                                </button>
                              )}
                            </Menu.Item>
                          </>
                        )}
                        {userInfo && userInfo?.isAdmin && (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={'/admin/userlist'}
                                  className={`${
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700'
                                  } block px-4 py-2 text-sm w-full text-left`}
                                >
                                  Users
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={'/admin/productlist'}
                                  className={`${
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700'
                                  } block px-4 py-2 text-sm w-full text-left`}
                                >
                                  Products
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={'/admin/orderslist'}
                                  className={`${
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700'
                                  } block px-4 py-2 text-sm w-full text-left`}
                                >
                                  Order
                                </Link>
                              )}
                            </Menu.Item>
                          </>
                        )}
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          ) : (
            <Link to={`/register`}>
              <i className="flex items-center  hover:opacity-50 cursor-pointer">
                <CgProfile />
                <p className="ml-1">SIGN IN</p>
              </i>
            </Link>
          )}
          <div className="relative inline-block text-left"></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
