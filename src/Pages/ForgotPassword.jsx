import React, { useState } from "react";
import Navbar from "../Components/Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, otp });
    // Logic to verify OTP and redirect to reset password page
  };

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500"
        >
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default ForgotPassword;
