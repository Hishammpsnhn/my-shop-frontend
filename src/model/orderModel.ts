import { CartProduct } from "./cartModel";
import { ShippingAddress } from "./shippingAddressModel";

export interface orderItems{
    orderItems:Array<CartProduct>,
    shippingAddress:ShippingAddress,
    paymentMethod:string,
    itemsPrice:number,
    taxPrice:number,
    shippingPrice:number,
    totalPrice:number,
    _id?:string
    user?:{name:string, email:string}
    isPaid?:boolean
  
}
