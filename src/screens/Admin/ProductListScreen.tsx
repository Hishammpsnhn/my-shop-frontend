import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { AiFillEdit } from 'react-icons/ai';
import { BsTrashFill } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { useAppDispatch } from '../../hook';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, listProducts } from '../../actions/productAction';

function ProductListScreen() {
  const Products = useSelector((state: RootState) => state.product);
  const {
    error,
    loading,
    products,
    page,
    pages,
    deleteProduct: productDeleted,
  } = Products;

  const userInfo = useSelector((state: RootState) => state.user.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo, navigate, productDeleted]);

  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id));
    }
  };

  console.log(Products);
  return (
    <div className="w-[70%] m-auto">
      <div className="flex justify-between items-center pb-5">
        <h1 className="uppercase  text-3xl font-sans  tracking-widest">
          PRODUCTS
        </h1>
        <button className="flex text-center  justify-center items-center bg-green-500 py-3 px-5 border-none rounded text-white font-bold text-base tracking-wider hover:opacity-80">
          <FaPlus />
          <span className="pl-2">CREATE</span>
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <table className="min-w-full text-left text-sm font-light">
          <thead className=" border border-gray-300 bg-white font-medium">
            <tr>
              <th scope="col" className="px-6 py-4">
                ID
              </th>
              <th scope="col" className="px-6 py-4">
                NAME
              </th>
              <th scope="col" className="px-6 py-4">
                PRICE
              </th>
              <th scope="col" className="px-6 py-4">
                CATEGORY
              </th>
              <th scope="col" className="px-6 py-4">
                BRAND
              </th>
              <th scope="col" className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, i) => (
              <tr
                key={product._id}
                className={`border  border-gray-300 ${
                  i % 2 === 0 ? 'bg-gray-200' : 'bg-white hover:bg-gray-200'
                }  `}
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  {product._id}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{product.name}</td>
                <td className="whitespace-nowrap px-6 py-4">{product.price}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {product.category}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{product.brand}</td>
                <td className="whitespace-nowrap px-6 py-4 flex">
                  <button
                    className="mr-5 hover:opacity-70"
                    // onClick={}
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    onClick={() => deleteHandler(product._id)}
                    className="ml-5 text-red-600 hover:opacity-70"
                  >
                    <BsTrashFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductListScreen;