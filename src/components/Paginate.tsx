import React from "react";
import { Link } from "react-router-dom";

type Props = {
    page: number,
    pages: number,
    keyword?: string,
    isAdmin?: boolean
}
function Paginate({ page, pages, keyword = "", isAdmin = false }: Props) {
    return (
        <>
            {
                pages > 1 && (
                    <nav className="my-5">
                        <ul className="inline-flex items-center -space-x-px">
                            {Array.from(Array(pages).keys()).map((x) => (
                                <li key={x}>
                                    <Link to={
                                        !isAdmin
                                            ? keyword
                                                ? `/search/${keyword}/page/${x + 1}`
                                                : `/page/${x + 1}`
                                            : `/admin/productlist/${x + 1}`
                                    } className={`px-3 py-2 leading-tight ${x + 1 === page ? 'bg-black text-white' : 'hover:bg-gray-100  text-gray-700 '}`}>{x + 1}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )
            }

        </>
    )
}

export default Paginate;
