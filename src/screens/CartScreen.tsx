import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch } from "../hook";
import { addItemToCart, removeItem } from "../actions/cartAction";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function CartScreen() {

  const params = useParams()
  const location = useLocation();
  const dispatch = useAppDispatch()

  const { cartItems } = useSelector((state: RootState) => state.cart)


  const qtyString = new URLSearchParams(location.search).get('qty');
  const qty = qtyString ? parseInt(qtyString) : 1;

  const productId = params.id;

  useEffect(() => {
    if (productId) {
      dispatch(addItemToCart(productId, qty))
    }
  }, [productId, dispatch, qty]);

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id))
  }
  return (
    <div className="mx-40 flex justify-between">
      <div className="w-[50%]">
        <h1 className="text-4xl p-5">SHOPPING CART</h1>
        {cartItems.map((cart) => (
          <CartScreenitem id={cart.id} name={cart.name} image={cart.image} price={cart.price} qty={cart.qty} handleRemoveItem={handleRemoveItem} countInStock={cart.countInStock} />
        ))}
      </div>
      <div className="  mt-5">
        <div className="border border-gray-400 ">
          <div className="p-4">
            <h2 className="text-2xl text-gray-700 tracking-widest mb-3">SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) ITEMS</h2>
            <p>$
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </p>
          </div>
          <div className="border border-t-gray-400 w-full px-4 py-2">
            <button className="bg-black w-[350px] p-4 text-white text-xs tracking-wider font-semibold ">PORCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
interface Props {
  id: string
  name: string,
  image: string,
  price: number,
  countInStock: number,
  qty: number,
  handleRemoveItem: (id: string) => void

}
const CartScreenitem = ({ name, image, qty, price, id, countInStock, handleRemoveItem }: Props) => {

  const dispatch = useAppDispatch();
  const quantityOptions = Array.from({ length: countInStock }, (_, index) => Number(index) + 1);

  return (
    <div key={id} className="ml-10 flex justify-between text-gray-500">
      <img className="w-20 h-20" src={image} alt="image" />
      <p className="w-[25%] hover:underline cursor-pointer">{name}</p>
      <p>$ {price}</p>
      <select defaultValue={qty} id="countries" className=" border border-gray-300 w-20  block  p-2.5 h-11 bg-slate-200" onChange={(e) => dispatch(addItemToCart(id, Number(e.target.value)))}>
        {
          quantityOptions.map((value) => (
            <option key={value} value={value} >{value}</option>
          ))
        }
      </select>
      <button className="hover:bg-gray-200 w-20 h-11 text-xl flex items-center justify-center" onClick={() => handleRemoveItem(id)}>
        <AiFillDelete />
      </button>
    </div>
  )
}
