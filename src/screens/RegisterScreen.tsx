import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../actions/userAction";
import { useAppDispatch } from "../hook";
import { RootState } from "../store";


function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState("")

    const userInfo = useSelector((state: RootState) => state.user)
    let navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (userInfo.user) {
          navigate('/')
        }
      }, [ userInfo])
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const user = { username: "testuser", password: "testpassword" };
            dispatch(register({ name, email, password }));
        } else {
            setMessage("Confirm Password does not match")
        }
    }
    

    return <div className="mt-10">
        <div className="w-full max-w-xs m-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username"
                        type="text"
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Confirm Password
                    </label>
                    <input className={`shadow appearance-none border ${message && "border-orange-500"}  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {message &&
                        <p className="text-red-500 text-xs italic">{message}</p>
                    }
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Register
                    </button>
                    <Link to='/login' className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Have an Account?
                    </Link>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    </div>;
}

export default RegisterScreen;
