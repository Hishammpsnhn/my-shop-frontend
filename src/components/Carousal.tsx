import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const data = [
  {
    image: 'https://flowbite.com/docs/images/carousel/carousel-1.svg',
    name: 'first',
  },
  {
    image: 'https://flowbite.com/docs/images/carousel/carousel-2.svg',
    name: 'first',
  },
  {
    image: 'https://flowbite.com/docs/images/carousel/carousel-3.svg',
    name: 'first',
  },
];
function Carousal() {
  return (
    <div className="w-[90%] m-auto p-10  relative z-[-1]">
      <Carousel autoPlay showThumbs={false}>
        {data.map(({ image, name }, i) => (
          <div key={i} className="bg-gray-700 p-5 rounded">
            <img className="w-56 h-56 rounded" src={image} />
            <p className="text-white text-2xl font-semibold uppercase p-5">
              {name}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Carousal;
