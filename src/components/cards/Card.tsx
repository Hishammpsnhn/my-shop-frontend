import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import API_BASE_URL from '../../config/config';

interface props {
  name: string;
  image: string;
  rating: number;
  price: number;
  id: string;
  reviewLength: number;
}

function Card({ name, image, rating, price, reviewLength, id }: props) {
  return (
    <Link to={`/product/${id}`}>
      <div className=" rounded  overflow-hidden p-2 border">
        <img className="w-full " src={`${API_BASE_URL}${image}`} alt={name} />
        <div className="px-4 pt-2 pb-5">
          <p className="text-gray-800 font-medium text-base capitalize ">
            {name}
          </p>
          <Rating rating={rating} reviewCount={reviewLength} color={'orange'} />
          <div className="font-bold text-xl mb-2">$ {price}</div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
