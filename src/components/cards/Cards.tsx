import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Card from './Card';
import Loader from '../Loader';

function Cards() {
  const state = useSelector((state: RootState) => state.product)
  const { products,loading } = state;
  return (
    <div className="mx-20 pt-10 ">
      <h6 className="text-3xl font-bold font-serif tracking-wide mb-10">
        Latest Products
      </h6>
      {loading && (
        <Loader/>
      )}
      <div className=" grid grid-cols-4 gap-4">
        {products.map((item) => (
          <Card key={item._id} id={item._id} name={item.name} image={item.image} rating={item.rating} price={item.price} reviewLength={item.reviews.length} />
        ))}
      </div>
    </div>
  );
}

export default Cards;
