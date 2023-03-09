import React from "react";
import Rating from "../components/cards/Rating";

function ProductScreen() {
    return (
        <div className="mx-40">
            <div className="p-3">
                <button className=" text-xs font-semibold hover:bg-black hover:text-white p-1 rounded">
                    GO BACK
                </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
                <div className="col-span-2 m-auto">
                    <img className="p-5 w-[500px] h-[500px]" src="https://m.media-amazon.com/images/I/61SUj2aKoEL._SX679_.jpg" />
                </div>
                <div className=" flex col-span-2 divide-y  justify-between">
                    <div className="w-[45%] ">
                        <div className="divide-y">
                            <h4 className="uppercase text-gray-500 text-5xl font-sans py-5">airpod 3 air wirless bluetooth</h4>
                            <div className="divide-y">
                                <Rating value={5} color="orange" text="1 review" />
                                <p className="py-2">Price: $89.99 </p>
                            </div>
                        </div>
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit mollitia, expedita totam natus incidunt ab dolor ratione eum nostrum odit sed eligendi provident dicta voluptate iure maiores deleniti vero? Aut?
                        </div>
                    </div>
                    <div className="w-[45%]">
                        <Table />
                    </div>
                </div>
            </div>
        </div>
    )
}
const Table = () => (
    <div>
        <div className="relative overflow-x-auto shadow sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-600 border">

                <tbody>
                    <tr className="border-b">
                        <th scope="row" className="px-6 py-4 font-medium ">
                            Price
                        </th>
                        <td className="px-6 py-4">
                            $89.9
                        </td>

                    </tr>
                    <tr className="border-b">
                        <th scope="row" className="px-6 py-4 font-medium">
                            Status
                        </th>
                        <td className="px-6 py-4">
                            Instock
                        </td>
                    </tr>
                    <tr className="border-b">
                        <th scope="row" className="px-6 py-4 font-medium">
                            Qty
                        </th>
                        <td className="px-6 py-4">
                            <select id="countries" className=" border border-gray-300 rounded-lg  block w-full p-2.5 ">
                                <option value="1" selected>1</option>
                                <option value="2" >2</option>
                                <option value="3">3</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className="bg-black  text-white font-bold py-2 px-4 rounded w-full hover:opacity-80">
                ADD TO CART
            </button>
        </div>

    </div>
)

export default ProductScreen;
