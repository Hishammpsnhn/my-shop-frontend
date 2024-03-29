import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../actions/userAction';
import { useAppDispatch } from '../hook';
import { RootState } from '../store';
import Footer from '../components/Footer';

function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [incorrectPassword, setIncorrectPassword] = useState<boolean>(false);

  const userInfo = useSelector((state: RootState) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get('redirect');

  useEffect(() => {
    if (userInfo.user) {
      navigate(redirect ? `/${redirect}` : '/');
    }
  }, [userInfo, navigate, redirect]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ email, password }));
    }
  };

  return (
    <>
      <div className="mt-10 min-h-[67vh]">
        <div className=" m-auto max-w-xs bg-white shadow-md rounded p-1 pb-5">
          <h3 className="font-serif text-2xl ">SIGN IN</h3>
          {userInfo.error ? (
            <div className="w-full bg-red-100 border text-amber-800 p-2.5 ">
              {userInfo.error}
            </div>
          ) : (
            <></>
          )}
          <form className="px-8 pt-6 " onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className={`shadow appearance-none border ${
                  incorrectPassword && ' border-red-500'
                } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {incorrectPassword && (
                <p className="text-red-500 text-xs italic">
                  Please choose a password.
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            <Link to="/register">
              <p className="pt-5 text-center font-bold text-sm text-blue-500 hover:text-blue-800">
                New customer?
              </p>
            </Link>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginScreen;
