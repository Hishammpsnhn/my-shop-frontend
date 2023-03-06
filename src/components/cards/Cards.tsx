import React from 'react';
import Card from './Card';

function Cards() {
  return (
    <div className="mx-20 pt-10 ">
      <h6 className="text-3xl font-bold font-serif tracking-wide mb-10">
        Latest Products
      </h6>
      <div className=" grid grid-cols-4 gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default Cards;
