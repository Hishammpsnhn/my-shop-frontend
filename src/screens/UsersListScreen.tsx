import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../hook";
import { Link, useNavigate } from "react-router-dom";
import { DeleteUser, listUsers } from "../actions/userAction";
import { AiFillCheckCircle, AiFillEdit } from "react-icons/ai";
import Loader from "../components/Loader";
import { FaTimesCircle } from "react-icons/fa";
import { BsTrashFill } from "react-icons/bs";
import Message from "../components/Message";

function UsersListScreen() {
    const userInfo = useSelector((state: RootState) => state.user.user);
    const usersListDetails = useSelector((state: RootState) => state.usersList);
    const { usersList, loading, error, deleteUserSuccess } = usersListDetails

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(userInfo, userInfo?.isAdmin)
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')

        }
    }, [dispatch, userInfo, navigate, deleteUserSuccess]);

    const deleteHanlder = (id: string) => {
        if (window.confirm('Are you sure you want to delete')) {
            dispatch(DeleteUser(id))
        }
    }


    return (
        <div className="w-[70%] m-auto">
            <h1 className="uppercase  text-3xl font-sans py-5 tracking-widest">USERS</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message type='error'>{error}</Message>
            ) : (
                <>
                    <table className="w-full text-left text-sm font-light ">
                        <thead
                            className=" border border-gray-300 bg-white font-medium">
                            <tr>
                                <th scope="col" className="px-6 py-4">ID</th>
                                <th scope="col" className="px-6 py-4">NAME</th>
                                <th scope="col" className="px-6 py-4">EMAIL</th>
                                <th scope="col" className="px-6 py-4">ADMIN</th>
                                <th scope="col" className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map((user, i) => (
                                <tr
                                    key={i}
                                    className={`buser  buser-gray-300 ${i % 2 === 0 ? "bg-gray-200" : "bg-white hover:bg-gray-200"}  `}>
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{user._id}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                                    <td className={`whitespace-nowrap px-6 py-4 ${user.isAdmin ? "text-green-400" : "text-red-400"} font-bold text-lg`}>{user.isAdmin ? <AiFillCheckCircle /> : <FaTimesCircle />}</td>
                                    <td className="whitespace-nowrap px-6 py-4 flex">
                                        <Link to={``} className="mr-5 hover:opacity-70"><AiFillEdit /></Link>
                                        <button onClick={() => deleteHanlder(user._id)} className="ml-5 text-red-600 hover:opacity-70"><BsTrashFill /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table >
                </>
            )}
        </div>
    )
}
export default UsersListScreen;
