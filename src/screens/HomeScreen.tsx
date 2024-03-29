import React, { useEffect } from 'react';
import Cards from '../components/cards/Cards';
import Carousal from '../components/Carousal';
import { listProducts, topProducts } from '../actions/productAction';
import { useAppDispatch } from '../hook';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

function HomeScreen() {
  const state = useSelector((state: RootState) => state.product);
  const { error, page, pages, products, loading } = state;

  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(listProducts(params.keyword, params.pageNumber));
    } else if (params.keyword || params.pageNumber) {
      dispatch(listProducts(params.keyword, params.pageNumber));
    }
  }, [dispatch, params]);

  return (
    <>
      <div className="container px-4 m-auto max-w-[1140px] min-h-[67vh]">
        {!params.keyword ? <Carousal /> : <></>}
        <div>
          <h1 className="text-3xl font-serif tracking-wider mb-10 mt-5">
            LATEST PRODUCTS
          </h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message type="error">{error}</Message>
          ) : (
            <>
              <Cards />
              <Paginate pages={pages} page={page} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomeScreen;
