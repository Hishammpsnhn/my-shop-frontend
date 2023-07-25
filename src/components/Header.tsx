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
import { listProducts } from '../actions/productAction';

const AdminNav: string[] = ['chart', 'users', 'products', 'orders'];

function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [keyword, setKeyword] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);
  const { user: userInfo } = user;

  const handleHome = () => {
    dispatch(listProducts());
    setKeyword('');
  };

  return (
    <div className={`bg-gray-700 mb-10  ease-in-out duration-300`}>
      <div className="container m-auto max-w-[1140px]">
        <div className="mx-10 py-7 lg:flex  items-center ">
          <div className="flex justify-between">
            <Link
              to="/"
              className="text-white font-serif text-3xl "
              onClick={handleHome}
            >
              MYSHOP
            </Link>
            <div className="block lg:hidden">
              <button
                className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"
                onClick={() => setToggleMenu((prev) => !prev)}
              >
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
          </div>

          <div
            className={` ${
              !toggleMenu ? 'hidden' : 'translate-y-0'
            } ease-in-out duration-300  w-full lg:flex lg:justify-between `}
          >
            <div className="ss:w-96 lg:py-0 py-5">
              <SearchBox
                isAdmin={userInfo ? userInfo?.isAdmin : false}
                keyword={keyword}
                setKeyword={setKeyword}
              />
            </div>
            <div className="lg:flex items-center font-serif text-xs text-gray-400">
              <i className="flex items-center hover:opacity-50 cursor-pointer pb-5 lg:pb-0">
                <AiOutlineShoppingCart />
                <Link to={'/cart'} className="mr-5 ml-1">
                  CART
                </Link>
              </i>
              {userInfo ? (
                <Menu>
                  {({ open }) => (
                    <div>
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
                          className="origin-top-right  lg:absolute relative w-full right-0 mt-2 lg:w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div className="py-1 ">
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
                            {userInfo &&
                              userInfo?.isAdmin &&
                              AdminNav.map((item, i) => (
                                <Menu.Item key={i}>
                                  {({ active }) => (
                                    <Link
                                      to={`/admin/${item}`}
                                      className={`${
                                        active
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-700'
                                      } block px-4 py-2 text-sm w-full text-left capitalize`}
                                    >
                                      {item}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </div>
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
      </div>
    </div>
  );
}

export default Header;
