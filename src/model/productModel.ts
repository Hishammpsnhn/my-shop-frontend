export interface Product {
  _id: string;
  user: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: Array<ReviewModal>;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
}
export interface ReviewModal {
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}
