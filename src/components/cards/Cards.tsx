import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Card from './Card';
import Loader from '../Loader';

function Cards() {
  const state = useSelector((state: RootState) => state.product);
  const { products, loading } = state;
  return (
    <div className="">
     
      {loading ? (
        <div className='w-full'>
          <Loader />
        </div>
      ) : (
        <div className=" grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-3 ss:grid-cols-2 gap-4">
          {products.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              rating={item.rating}
              price={item.price}
              reviewLength={item.reviews.length}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Cards;
