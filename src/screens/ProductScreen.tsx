import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "../components/cards/Rating";
import { listProductDetails } from "../actions/productAction";
import { useAppDispatch } from "../hook";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Loader from "../components/Loader";

function ProductScreen() {

    const [qty, setQty] = useState(1)

    const params = useParams();
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const state = useSelector((state: RootState) => state.productDetails)
    const { productDetails, loading, error } = state;

    useEffect(() => {
        if (params.id && params.id !== productDetails?._id) {
            dispatch(listProductDetails(params.id))
        }
    }, [params]);

    const addtoCartHandler = () => {
        navigate(`/cart/${params.id}?qty=${qty}`)
        
    }



    return (
        <div className="mx-40">
            <div className="p-3">
                <Link className=" text-xs font-semibold hover:bg-black hover:text-white p-1 rounded" to={`/`}>
                    Go BACK
                </Link>
            </div>
            {loading ? (<Loader />) : (
                <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-2 m-auto">
                        <img className="p-5 w-[500px] h-[500px]" src={productDetails?.image} alt="images" />
                    </div>
                    <div className=" flex col-span-2 divide-y  justify-between">
                        <div className="w-[45%] ">
                            <div className="divide-y">
                                <h4 className="uppercase text-gray-500 text-5xl font-sans py-5">{productDetails?.name}</h4>
                                <div className="divide-y">
                                    <Rating rating={5} color="orange" reviewCount={5} />
                                    <p className="py-2">Price: {productDetails?.price} </p>
                                </div>
                            </div>
                            <div>
                                {productDetails?.description}
                            </div>
                        </div>
                        <div className="w-[45%]">
                            <div className="relative overflow-x-auto shadow sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-600 border">

                                    <tbody>
                                        <tr className="border-b">
                                            <th scope="row" className="px-6 py-4 font-medium ">
                                                Price
                                            </th>
                                            <td className="px-6 py-4">
                                                {productDetails?.price}
                                            </td>

                                        </tr>
                                        <tr className="border-b">
                                            <th scope="row" className="px-6 py-4 font-medium">
                                                Status
                                            </th>
                                            <td className="px-6 py-4">
                                                {productDetails?.countInStock ? 'In Stock' : "Out Of Stock"}
                                            </td>
                                        </tr>
                                        <tr className="border-b">
                                            <th scope="row" className="px-6 py-4 font-medium">
                                                Qty
                                            </th>
                                            <td className="px-6 py-4">
                                                <select defaultValue={1} id="countries" className=" border border-gray-300 rounded-lg  block w-full p-2.5 ">
                                                    <option value="1" >1</option>
                                                    <option value="2" >2</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button className="bg-black  text-white font-bold py-2 px-4 rounded w-full hover:opacity-80" onClick={addtoCartHandler}>
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductScreen;
