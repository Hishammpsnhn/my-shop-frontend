import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useAppDispatch } from '../../hook';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteUser, EditUser, listUsers } from '../../actions/userAction';
import { AiFillCheckCircle, AiFillEdit } from 'react-icons/ai';
import Loader from '../../components/Loader';
import { FaTimesCircle } from 'react-icons/fa';
import { BsTrashFill } from 'react-icons/bs';
import Message from '../../components/Message';

function UsersListScreen() {
  const userInfo = useSelector((state: RootState) => state.user.user);
  const usersListDetails = useSelector((state: RootState) => state.usersList);
  const { usersList, loading, error, deleteUserSuccess, userEditSuccess } =
    usersListDetails;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo, navigate, deleteUserSuccess, userEditSuccess]);

  const deleteHanlder = (id: string) => {
    if (window.confirm('Are you sure you want to delete')) {
      dispatch(DeleteUser(id));
    }
  };
  const handleEdit = (id: string, name: string, isAdmin: boolean) => {
    if (!isAdmin) {
      if (window.confirm(`Are you sure you want to the ${name} as Admin`)) {
        dispatch(EditUser(id));
      }
    } else {
      alert('you are already a admin');
    }
  };

  return (
    <div className="container m-auto overflow-hidden max-w-[1140px] px-2">
      <h1 className="uppercase  text-3xl font-sans py-5 tracking-widest">
        USERS
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <div className='overflow-x-scroll'>
          <table className="w-full text-left text-sm font-light overflow-hidden">
            <thead className=" border border-gray-300 bg-white font-medium">
              <tr>
                <th scope="col" className="px-6 py-4">
                  ID
                </th>
                <th scope="col" className="px-6 py-4">
                  NAME
                </th>
                <th scope="col" className="px-6 py-4">
                  EMAIL
                </th>
                <th scope="col" className="px-6 py-4">
                  ADMIN
                </th>
                <th scope="col" className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user, i) => (
                <tr
                  key={i}
                  className={`buser  buser-gray-300 ${
                    i % 2 === 0 ? 'bg-gray-200' : 'bg-white hover:bg-gray-200'
                  }  `}
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {user._id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                  <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                  <td
                    className={`whitespace-nowrap px-6 py-4 ${
                      user.isAdmin ? 'text-green-400' : 'text-red-400'
                    } font-bold text-lg`}
                  >
                    {user.isAdmin ? <AiFillCheckCircle /> : <FaTimesCircle />}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 flex">
                    <button
                      onClick={() =>
                        handleEdit(user._id, user.name, user.isAdmin)
                      }
                      className="mr-5 hover:opacity-70"
                    >
                      <AiFillEdit />
                    </button>
                    <button
                      onClick={() => deleteHanlder(user._id)}
                      className="ml-5 text-red-600 hover:opacity-70"
                    >
                      <BsTrashFill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default UsersListScreen;
