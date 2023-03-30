import React, { useEffect } from 'react';
import Cards from '../components/cards/Cards';
import Carousal from '../components/Carousal';
import { listProducts } from '../actions/productAction';
import { useAppDispatch } from '../hook';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function HomeScreen() {
  const dispatch = useAppDispatch()

  useEffect(() => {
     dispatch(listProducts())
  }, [dispatch]);

  return (
    <div>
      <Carousal />
      <Cards />
    </div>
  );
}

export default HomeScreen;
