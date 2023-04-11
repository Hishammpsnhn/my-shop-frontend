import React, { useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../hook';
import { addItemToCart, removeItem } from '../actions/cartAction';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Message from '../components/Message';
import Footer from '../components/Footer';

function CartScreen() {
  const params = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const { cartItems } = useSelector((state: RootState) => state.cart);

  const qtyString = new URLSearchParams(location.search).get('qty');
  const qty = qtyString ? parseInt(qtyString) : 1;

  const productId = params.id;

  useEffect(() => {
    if (productId) {
      dispatch(addItemToCart(productId, qty));
    }
  }, [productId, dispatch, qty]);

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <>
      <div className="container m-auto sm:flex justify-between max-w-[1140px] min-h-[67vh]">
        <div className=" mb-10 sm:w-[60%]">
          <h1 className="text-4xl p-5 ">SHOPPING CART</h1>
          {cartItems.length === 0 ? (
            <Message type="info">
              {' '}
              Your cart is empty{' '}
              <Link className="hover:underline" to="/">
                Go Back
              </Link>
            </Message>
          ) : (
            <div>
              {cartItems.map((cart) => (
                <CartScreenitem
                  key={cart.id}
                  id={cart.id}
                  name={cart.name}
                  image={cart.image}
                  qty={Number(params?.qty)}
                  price={cart.price}
                  stockQty={cart.qty}
                  handleRemoveItem={handleRemoveItem}
                  countInStock={cart.countInStock}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="border border-gray-400 mx-2">
            <div className="p-4 ">
              <h2 className="text-2xl text-gray-700 tracking-widest mb-3">
                SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                ITEMS
              </h2>
              <p>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="border border-t-gray-400 w-full px-4 py-2">
              <button
                className="bg-black w-full p-4 text-white text-xs tracking-wider font-semibold "
                onClick={handleCheckout}
              >
                PORCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartScreen;
interface Props {
  id: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  stockQty: number;
  qty: number;
  handleRemoveItem: (id: string) => void;
}
const CartScreenitem = ({
  name,
  image,
  stockQty,
  qty,
  price,
  id,
  countInStock,
  handleRemoveItem,
}: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const quantityOptions = Array.from(
    { length: countInStock },
    (_, index) => Number(index) + 1
  );

  return (
    <>
      <div className="sm:w-[70%] sm:ml-10 px-2 sm:px-0 sm:flex text-gray-500 mt-5">
        <div className=' w-full  grid grid-cols-6 gap-2'>

          <div className='ss:col-span-1 col-span-6 ' >
            <img className="" src={image} alt="image" />
          </div>
          <div className=' ss:col-span-2 col-span-6'>
            <a
              onClick={() => navigate(`/product/${id}`)}
              className="font-semibold text-base  hover:underline cursor-pointer"
            >
              {name}
            </a>
          </div>
          <div className='ss:col-span-1 col-span-6'>
            $ {price}
          </div>
          <div className='ss:col-span-1 col-span-6'>
            <select
              defaultValue={stockQty}
              className="  border border-gray-300 px-5 py-2 bg-slate-100 sm:w-fit w-full"
              onChange={(e) => dispatch(addItemToCart(id, Number(e.target.value)))}
            >
              {quantityOptions.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className='ss:col-span-1 col-span-6'>
            <button
              className="hover:bg-gray-200 w-20 h-11 text-xl flex items-center justify-center"
              onClick={() => handleRemoveItem(id)}
            >
              <AiFillDelete />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
