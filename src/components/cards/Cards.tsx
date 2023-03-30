import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Card from './Card';

function Cards() {
  const state = useSelector((state:RootState) => state.product)
  console.log(state.products)

  return (
    <div className="mx-20 pt-10 ">
      <h6 className="text-3xl font-bold font-serif tracking-wide mb-10">
        Latest Products
      </h6>
      <div className=" grid grid-cols-4 gap-4">
       {state.products.map((item)=>(
        <Card name={item.name} image={item.image} rating={item.rating} price={item.price} />
       ))}
      </div>
    </div>
  );
}

export default Cards;
