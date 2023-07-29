import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { RootState } from '../store';
import Loader from './Loader';
import Message from './Message';
import { Link } from 'react-router-dom';
import { topProducts } from '../actions/productAction';
import { useAppDispatch } from '../hook';
import API_BASE_URL from '../config/config';

function Carousal() {
  const topProuct = useSelector((state: RootState) => state.topProducts);
  const { error, loading, products } = topProuct;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(topProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error" children={error} />
      ) : (
        <div className="py-10 bg-slate-700">
          <Carousel autoPlay showThumbs={false} infiniteLoop={true}>
            {products.map(({ image, name, _id }, i) => (
              <Link key={i} to={`/product/${_id}`}>
                <div className="w-52 h-48 m-auto">
                  <img
                    className="rounded"
                    onClick={() => alert('dlfjd;')}
                    src={`${API_BASE_URL}${image}`}
                    alt={name}
                  />
                </div>
                <p className="text-white text-xl font-semibold uppercase pb-10">
                  {name}
                </p>
              </Link>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
}

export default Carousal;
