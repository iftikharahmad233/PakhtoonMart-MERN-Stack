
import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const [data, setData] = useState({
        email: ""
    })


    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.forgotPassword,
                data: data
            })

            if (response.data.error) {
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                navigate("/verification-otp",{
                  state : data
                })
                setData({
                    email : "",
                })
                
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-slate-950 px-4 py-6">

            {/* Background Effects */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-green-400/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl"></div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-[380px] mx-auto">

                <div className="bg-white rounded-2xl shadow-2xl shadow-black/30 border border-white/50 p-5 sm:p-6">

                    {/* Logo */}
                    <div className="text-center mb-5">

                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-700 to-emerald-500 text-white text-xl font-bold shadow-lg shadow-green-700/30 mb-3">
                            PM
                        </div>

                        <h1 className="text-2xl font-extrabold text-gray-900">
                            Pakhtoon<span className="text-green-700">Mart</span>
                        </h1>

                        <p className="text-gray-500 text-xs mt-1">
                            Welcome back! Login to your account
                        </p>

                    </div>

                    {/* Heading */}
                    <div className="mb-5">
                        <h2 className="text-xl font-bold text-gray-800">
                            Welcome Back
                        </h2>

                        <p className="text-xs text-gray-500 mt-1 font-bold">
                            Frorget your password?
                        </p>
                    </div>

                    <form className="grid gap-3" onSubmit={handleSubmit}>

                        {/* Email */}
                        <div className="grid gap-1.5">

                            <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                Email Address
                            </label>

                            <input
                                type="email"
                                id="email"
                                className="w-full bg-gray-50 px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none transition-all focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100 placeholder:text-gray-400"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />

                        </div>

                        

                        {/* Login Button */}
                        <button
                            disabled={!valideValue}
                            className={`${valideValue
                                ? "bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700 hover:shadow-lg"
                                : "bg-gray-400 cursor-not-allowed"
                                } w-full text-white py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-300 active:scale-[0.98] mt-2`}
                        >
                            Send otp
                        </button>

                    </form>

                    {/* Register Link */}
                    <div className="text-center mt-5 pt-4 border-t border-gray-100">

                        <p className="text-xs sm:text-sm text-gray-600">
                            Already have an account?

                            <Link
                                to={"/login"}
                                className="font-bold text-green-700 hover:text-green-900 ml-1 transition-colors"
                            >
                                Login
                            </Link>
                        </p>

                    </div>

                </div>

                <p className="text-center text-green-100/70 text-xs mt-4">
                    © PakhtoonMart. All rights reserved.
                </p>

            </div>

        </section>
    )
}

export default ForgotPassword
