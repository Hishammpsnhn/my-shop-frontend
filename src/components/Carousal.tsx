import React from 'react';
import { useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { RootState } from '../store';
import Loader from './Loader';
import Message from './Message';
import { Link } from 'react-router-dom';
const data = [
  {
    image: 'https://flowbite.com/docs/images/carousel/carousel-1.svg',
    name: 'first',
  },
  {
    image: 'https://flowbite.com/docs/images/carousel/carousel-2.svg',
    name: 'first2',
  },
  {
    image: 'https://flowbite.com/docs/images/carousel/carousel-3.svg',
    name: 'first3',
  },
];

function Carousal() {
  const topProucts = useSelector((state: RootState) => state.topProducts);
  const { error, loading, products } = topProucts;

  return (
    <>
      {loading ? (<Loader />) : (
        error ? (<Message type='error' children={error} />) : (
          <div className="py-10 bg-slate-700">
            <Carousel autoPlay showThumbs={false} infiniteLoop={true}>
              {products.map(({ image, name,_id }, i) => (
                <>
                 <Link to={`/product/${_id}`}>
                  <div key={i} className="w-52 h-48 m-auto">
                    <img className="rounded" onClick={()=> alert("dlfjd;")} src={image} alt='img#123' />
                  </div>
                  <p className="text-white text-xl font-semibold uppercase pb-10">
                    {name}
                  </p>
                  </Link>
                </>
              ))}
            </Carousel>
          </div>
        )
      )}
    </>
  );
}

export default Carousal;
