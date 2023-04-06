import React, { useEffect, useState } from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import { useAppDispatch } from "../hook";
import Message from "../components/Message";
import Loader from "../components/Loader";

function ProfileScreen() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<null | string>(null)

  const userDetails = useSelector((state: RootState) => state.user);
  const { error, loading, user } = userDetails

  const navigate = useNavigate()
  const dispatch = useAppDispatch()


  useEffect(() => {
    if (!userDetails) {
      navigate('/login')
    } else {
      if (!user || !user.name || !user.email) {
        dispatch(getUserDetails())
        // dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [user, userDetails])

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setMessage(null)
      dispatch(updateUserProfile({name,email,password}))
    } else (
      setMessage("Password do not match")
    )
  }

  return (
    <div className="mx-40 grid grid-cols-4 gap-10">
      <div className="col-span-1">
        <h2 className="text-2xl text-black font-semibold tracking-wider">USER PROFILE</h2>
       {loading ? (
        <Loader/>
       ):(
        <form className="my-5" onSubmit={(e) => handleUpdateProfile(e)} >
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input className={`shadow appearance-none border ${message && 'border-orange-500'
              }  rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline`}
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {message && (
              <p className="text-red-500 text-xs italic">{message}</p>
            )}
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
        </form>
       )}
      </div>
      <div className="col-span-3">
        <h2 className="text-2xl text-black font-semibold tracking-wider">MY ORDERS</h2>
        <div className="flex flex-col my-5">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead
                    className=" border border-gray-300 bg-white font-medium">
                    <tr>
                      <th scope="col" className="px-6 py-4">#</th>
                      <th scope="col" className="px-6 py-4">First</th>
                      <th scope="col" className="px-6 py-4">Last</th>
                      <th scope="col" className="px-6 py-4">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      className="border  border-gray-300  bg-gray-200 ">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                      <td className="whitespace-nowrap px-6 py-4">Mark</td>
                      <td className="whitespace-nowrap px-6 py-4">Otto</td>
                      <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                    </tr>
                    <tr
                      className="border  border-gray-300 bg-white">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                      <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                      <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                      <td className="whitespace-nowrap px-6 py-4">@fat</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen;
