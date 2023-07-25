import { keyboard } from '@testing-library/user-event/dist/keyboard';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  isAdmin: boolean;
  keyword: string;
  setKeyword: (value: string) => void;
};

function SearchBox({ isAdmin, keyword, setKeyword }: Props) {
  const navigate = useNavigate();

  const location = useLocation();
  const currentUrl = location.pathname;

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      if (isAdmin && currentUrl === '/admin/productlist') {
        navigate(`admin/productlist/search/${keyword}`);
      } else {
        navigate(`/search/${keyword}`);
      }
    } else {
      navigate('/');
    }
  };
  return (
    <form className="ss:flex " onSubmit={(e) => submitHandler(e)}>
      <input
        type="text"
        className="bg-white border mb-2 ss:mb-0  border-gray-300 text-gray-900 ml-0 lg:ml-10   mr-5 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-black dark:placeholder-gray-500 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="eg: iphone"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        className=" bg-transparent hover:bg-blue-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        type="submit"
      >
        search
      </button>
    </form>
  );
}

export default SearchBox;
