import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBox() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<String>('');

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
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
