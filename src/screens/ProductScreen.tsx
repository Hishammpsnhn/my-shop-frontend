import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Rating from '../components/cards/Rating';
import {
  createProductReview,
  listProductDetails,
} from '../actions/productAction';
import { useAppDispatch } from '../hook';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Loader from '../components/Loader';
import Review from '../components/Review';
import Message from '../components/Message';
import { reviewReset } from '../Reducers/ReviewReducer';
import Footer from '../components/Footer';
import ReactImageMagnify from 'react-image-magnify';
import API_BASE_URL from '../config/config';

function ProductScreen() {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector(
    (state: RootState) => state.productDetails.productDetails
  );
  const loading = useSelector(
    (state: RootState) => state.productDetails.loading
  );
  const reviewDetails = useSelector((state: RootState) => state.review);
  const { error, loading: reviewLoading, success } = reviewDetails;

  const quantityOptions = Array.from(
    { length: productDetails?.countInStock || 0 },
    (_, index) => Number(index) + 1
  );

  useEffect(() => {
    if (success) {
      setRating(0);
      setComment('');
    }
    if (params.id || params.id !== productDetails?._id) {
      if (params.id) {
        dispatch(listProductDetails(params.id));
      }
      dispatch(reviewReset());
    }
  }, [params, success, dispatch]);

  const addtoCartHandler = () => {
    if (
      productDetails &&
      productDetails.countInStock &&
      productDetails.countInStock > 0
    ) {
      navigate(`/cart/${params.id}?qty=${qty}`);
    }
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (params.id) {
      dispatch(createProductReview(params.id, { rating, comment }));
    }
  };

  return (
    <>
      <div className="container mx-auto max-w-[1140px] min-h-[67vh]">
        <Link
          className=" text-[13px] text-gray-500 tracking-wide font-semibold hover:bg-stone-200 p-3 rounded"
          to={`/`}
        >
          GO BACK
        </Link>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid sm:grid-cols-4 grid-cols-1  gap-2  mx-2 md:mx-0 mt-3">
            <div className="col-span-2 ">
              {productDetails?.image && (
                <div className="flex flex-col">
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: productDetails?.name,
                        isFluidWidth: true,
                        src:`${API_BASE_URL}${productDetails?.image}`,
                      },
                      largeImage: {
                        src:`${API_BASE_URL}${productDetails?.image}`,
                        width: 1100,
                        height: 1100,
                      },
                      isHintEnabled: true,
                    }}
                  />
                </div>
              )}
            </div>
            <div className=" sm:flex col-span-2 divide-y  justify-between">
              <div className="sm:w-[45%] text-gray-500">
                <div className="divide-y ">
                  <h4 className="uppercase  text-3xl font-sans py-5 tracking-widest">
                    {productDetails?.name}
                  </h4>
                  <div className="divide-y ">
                    <Rating
                      rating={productDetails?.rating || 0}
                      color="orange"
                      reviewCount={productDetails?.numReviews}
                    />
                    <p className="py-2">Price: {productDetails?.price} </p>
                  </div>
                </div>
                <div>Description: {productDetails?.description}</div>
              </div>
              <div className="sm:w-[45%] py-5 sm:py-0">
                <div className=" overflow-x-auto shadow sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-600 border">
                    <tbody>
                      <tr className="border-b">
                        <th scope="row" className="px-6 py-4 font-medium ">
                          Price
                        </th>
                        <td className="px-6 py-4">{productDetails?.price}</td>
                      </tr>
                      <tr className="border-b">
                        <th scope="row" className="px-6 py-4 font-medium">
                          Status
                        </th>
                        <td className="px-6 py-4">
                          {productDetails?.countInStock
                            ? 'In Stock'
                            : 'Out Of Stock'}
                        </td>
                      </tr>
                      {productDetails &&
                      productDetails.countInStock &&
                      productDetails.countInStock > 0 ? (
                        <tr className="border-b">
                          <th scope="row" className="px-6 py-4 font-medium">
                            Qty
                          </th>
                          <td className="px-6 py-4">
                            <select
                              defaultValue={qty}
                              className=" border border-gray-300 w-20  block  p-2.5 h-11 bg-slate-200"
                              onChange={(e) => setQty(Number(e.target.value))}
                            >
                              {quantityOptions.map((value) => (
                                <option key={value} value={value}>
                                  {value}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ) : (
                        <div></div>
                      )}
                    </tbody>
                  </table>
                  <button
                    className={`bg-black text-white font-bold py-2 px-4 rounded w-full  ${
                      productDetails &&
                      productDetails.countInStock &&
                      productDetails.countInStock > 0
                        ? 'hover:opacity-80'
                        : 'cursor-not-allowed bg-gray-500'
                    }`}
                    onClick={addtoCartHandler}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-2 w-full sm:w-fit ">
              <h2 className="uppercase  text-3xl font-sans py-5 tracking-widest">
                REVIEWS
              </h2>
              <div className="divide-y">
                {productDetails &&
                  productDetails?.reviews.map((review) => (
                    <Review
                      createdAt={review.createdAt}
                      name={review.name}
                      comment={review.comment}
                      rating={review.rating}
                    />
                  ))}
              </div>
              <h2 className="uppercase  text-3xl font-sans py-5 tracking-widest ">
                WRITE A CUSTOMER REVIEW
              </h2>
              {reviewLoading ? (
                <Loader />
              ) : error ? (
                <Message type="error">{error}</Message>
              ) : (
                <div>
                  <form
                    className="text-gray-500"
                    onSubmit={(e) => submitHandler(e)}
                  >
                    <div className="mb-4">
                      <label className="block  text-sm font-bold mb-2">
                        Rating
                      </label>
                      <select
                        className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setRating(Number(e.target.value))}
                        defaultValue={rating}
                      >
                        <option value="0" disabled>
                          select...
                        </option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                    <label className="block text-sm font-bold mb-2">
                      Comment
                    </label>
                    <textarea
                      className=" block mb-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="commet"
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-black py-3 px-5  text-white tracking-wider mb-5"
                    >
                      SUBMIT
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProductScreen;
