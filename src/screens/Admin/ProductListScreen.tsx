import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { AiFillEdit } from 'react-icons/ai';
import { BsTrashFill } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { useAppDispatch } from '../../hook';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createProduct, deleteProduct, listProducts } from '../../actions/productAction';
import { resetUpdateOrder } from '../../Reducers/productDetailsReducer';
import Paginate from '../../components/Paginate';
import Footer from '../../components/Footer';

function ProductListScreen() {
  const ProductDetails = useSelector(
    (state: RootState) => state.productDetails
  );
  const { productDetails: product, loading: productLoading, error: productError } = ProductDetails;

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
  const params = useParams();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(resetUpdateOrder());
      dispatch(listProducts(params.keyword, params.pageNumber));
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo, navigate, productDeleted, product, params]);

  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <div className="container m-auto overflow-hidden max-w-[1140px] px-2 min-h-[67vh]">
        <div className="flex justify-between items-center pb-5">
          <h1 className="uppercase  text-3xl font-sans  tracking-widest">
            PRODUCTS
          </h1>
          <button className="flex text-center  justify-center items-center bg-green-500 py-3 px-5 border-none rounded text-white font-bold text-base tracking-wider hover:opacity-80" onClick={createProductHandler}>
            <FaPlus />
            <span className="pl-2">CREATE</span>
          </button>
        </div>
        {loading || productLoading ? (
          <Loader />
        ) : error || productError ? (
          <Message type="error">{error}</Message>
        ) : (
          <>
            <div className='overflow-x-scroll'>
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
                      className={`border  border-gray-300 ${i % 2 === 0 ? 'bg-gray-200' : 'bg-white hover:bg-gray-200'
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
                        <Link
                          to={`/admin/productedit/${product._id}`}
                          className="mr-5 hover:opacity-70"
                        >
                          <AiFillEdit />
                        </Link>
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
            </div>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProductListScreen;
