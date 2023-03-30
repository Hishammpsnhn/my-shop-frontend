import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

interface props{
  name: string;
  image: string;
  rating:number;
  price:number;
}

function Card({name,image,rating,price}:props) {
  return (
    <div className="w-[280px] rounded  overflow-hidden shadow-xl p-5">
         {/* <Link to={`/product/${product._id}`}></Link> */}
      <Link to={`/product`}>
        <img
          className="w-[180px] h-[180px] m-auto "
          src={image}
          alt="Sunset in the mountains"
        />
      </Link>
      <div className="px-4 py-2">
        <p className="text-gray-800 font-medium text-base capitalize ">
          {name}
        </p>
        <Rating value={rating} text={"1 reviews"} color={"orange"} />
        <div className="font-bold text-xl mb-2">$ {price}</div>
      </div>
    </div>
  );
}

export default Card;
