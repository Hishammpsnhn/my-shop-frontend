import React from 'react';
import Rating from './cards/Rating';
import { ReviewModal } from '../model/productModel';

function Review({ name, rating, comment, createdAt }: ReviewModal) {
  return (
    <div className="py-5 text-gray-500">
      <div className="divide-y-4">
        <div>
          <p className="capitalize">{name}</p>
          <div className="pl-3">
            <Rating rating={rating} />
            <p>{createdAt.substring(0, 10)}</p>
          </div>
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
}

export default Review;
