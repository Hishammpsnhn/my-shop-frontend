import React from 'react';
interface Props {
  rating: number;
  reviewCount?: number;
  color: string;
}
const Rating = ({ rating, reviewCount, color }: Props) => {
  return (
    <div className="py-2">
      <span className="pr-1">
        <i
          style={{ color }}
          className={
            rating >= 1
              ? 'fas fa-star'
              : rating >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span className="pr-1">
        <i
          style={{ color }}
          className={
            rating >= 2
              ? 'fas fa-star'
              : rating >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span className="pr-1">
        <i
          style={{ color }}
          className={
            rating >= 3
              ? 'fas fa-star'
              : rating >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span className="pr-1">
        <i
          style={{ color }}
          className={
            rating >= 4
              ? 'fas fa-star'
              : rating >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span className="pr-1">
        <i
          style={{ color }}
          className={
            rating >= 5
              ? 'fas fa-star'
              : rating >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      {reviewCount && <span>{reviewCount} reviews</span>}
    </div>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

export default Rating;
