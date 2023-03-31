export interface Product {
  _id: string;
  user: string,
  name: string,
  image: string,
  brand: string,
  category: string,
  description: string,
  reviews: [],
  rating: number,
  numReviews: number,
  price: number,
  countInStock: number,
}