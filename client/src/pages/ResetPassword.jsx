import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const valideValue = Object.values(data).every((el) => el);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((preve) => {
        return {
          ...preve,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    ///optional 
    if(data.newPassword !== data.confirmPassword){
        toast.error("New password and confirm password must be same.")
        return
    }

    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setData({
          email: "",
    newPassword: "",
    confirmPassword: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

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
            <h2 className="text-xl font-bold text-gray-800">Welcome Back</h2>

            <p className="text-xs text-gray-500 mt-1 font-bold">
              Enter Your New Password
            </p>
          </div>

          <form className="grid gap-3" onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="grid gap-1.5">
              <label
                htmlFor="newPassword"
                className="text-sm font-semibold text-gray-700"
              >
                New Password
              </label>

              <div className="flex items-center bg-gray-50 px-3 py-2.5 border border-gray-200 rounded-lg transition-all focus-within:bg-white focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                  name="newPassword"
                  value={data.newPassword}
                  onChange={handleChange}
                  placeholder="Enter your New password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((preve) => !preve)}
                  className="text-gray-500 hover:text-green-700 transition-colors"
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="grid gap-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold text-gray-700"
              >
                Confirm Password
              </label>

              <div className="flex items-center bg-gray-50 px-3 py-2.5 border border-gray-200 rounded-lg transition-all focus-within:bg-white focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="text-gray-500 hover:text-green-700 transition-colors"
                >
                  {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              disabled={!valideValue}
              className={`${
                valideValue
                  ? "bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700 hover:shadow-lg"
                  : "bg-gray-400 cursor-not-allowed"
              } w-full text-white py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-300 active:scale-[0.98] mt-2`}
            >
              Change Password
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
  );
};

export default ResetPassword;
