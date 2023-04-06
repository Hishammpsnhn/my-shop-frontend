import React, { useEffect } from 'react';
import Cards from '../components/cards/Cards';
import Carousal from '../components/Carousal';
import { listProducts } from '../actions/productAction';
import { useAppDispatch } from '../hook';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message';

function HomeScreen() {
  const state = useSelector((state: RootState) => state.product);
  const { error } = state;

  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(listProducts(params.keyword));
  }, [dispatch, params]);

  return (
    <div className="mx-40 ">
      {params.keyword ? (
        <Link
          className=" text-[13px] tracking-wide text-gray-500 font-semibold hover:bg-stone-200 p-3 rounded"
          to={`/`}
        >
          GO BACK
        </Link>
      ) : error?(
        <Message type='error'>{error}</Message>
      ): (
        <Carousal />
      )}
      <Cards />
    </div>
  );
}

export default HomeScreen;
