import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ImBooks } from "react-icons/im";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!password) {
      toast.error("Please Enter a valid password.");
      return;
    }

    try {
      console.log(process.env.REACT_APP_USER_SERVICE_URL);
      const response = await axios.post(
        `${process.env.REACT_APP_USER_SERVICE_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        toast.success("Login successful!");
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("role", response.data.role);
        if (response.data.role === "ADMIN") navigate("/admin/dashboard");
        if (response.data.role === "CUSTOMER") navigate("/");
      } else {
        toast.error(response.data.message || "Login failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-lilac_dark flex flex-col justify-center items-center text-white p-8">
        <ImBooks className="text-black text-8xl" />
        <h1 className="text-3xl font-bold text-black">READMOREE</h1>
        <p className="mt-2 text-center px-10">
          "Discover a world of books at ReadMoree – your go-to online bookstore
          for every genre. Shop now and let your next great read find you!"
        </p>
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <div className="bg-white py-10 px-5 w-full max-w-md">
          <h2 className="text-3xl font-bold text-start text-gray-700">
            Welcome Back
          </h2>
          <p className="text-sm text-start text-semibold text-gray-500 mb-8 mt-2">
            Sign In & Continue Your Reading Journey.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-lilac_dark rounded-lg focus:ring-1 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-lilac_dark rounded-lg focus:ring-1 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full bg-lilac_dark text-white py-3 rounded-lg hover:bg-lilac focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>

            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-lilac_dark hover:underline">
                Signup now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
