import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ImBooks } from "react-icons/im";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobile ||
      !dob ||
      !gender ||
      !password
    ) {
      toast.error("All fields are required");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
      toast.error("Invalid mobile number");
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
      phone: mobile,
      dob,
      gender,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/register",
        userData,
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        console.log(response.data);
        toast.success(response.data.message);
        navigate("/verify-email");
      } else {
        toast.error(response.data.message || "Signup failed");
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
            Create New Account
          </h2>
          <p className="text-sm text-start text-semibold text-gray-500 mb-8 mt-2">
            Join ReadMoree – Explore & Enjoy Books!
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex space-x-2">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-lilac_dark rounded-lg focus:ring-1 focus:ring-lilac_dark"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-lilac_dark rounded-lg focus:ring-1 focus:ring-blue-400"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-lilac_dark rounded-lg focus:ring-1 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-lilac_dark rounded-lg focus:ring-1 focus:ring-blue-400"
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-lilac_dark rounded-lg focus:ring-1 focus:ring-blue-400"
            />

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-lilac_dark rounded-lg focus:ring-1 focus:ring-blue-400"
            >
              <option value="">Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-lilac_dark rounded-lg focus:ring-1 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-lilac_dark rounded-lg focus:ring-1 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full bg-lilac_dark text-white py-3 rounded-lg hover:bg-lilac focus:ring-2 focus:ring-blue-400"
            >
              Register
            </button>

            <p className="mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-lilac_dark hover:underline">
                Login now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
