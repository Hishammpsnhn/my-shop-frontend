import { CartProduct } from "./cartModel";
import { Product } from "./productModel";
import { ShippingAddress } from "./shippingAddressModel";

export interface orderItems{
    orderItems:Array<CartProduct>,
    shippingAddress:ShippingAddress,
    paymentMethod:string,
    itemsPrice:number,
    taxPrice:number,
    shippingPrice:number,
    totalPrice:number,
}
