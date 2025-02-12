import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ImBooks } from "react-icons/im";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [resendAvailable, setResendAvailable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setResendAvailable(true);
    }
  }, [timeLeft]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_USER_SERVICE_URL}/auth/verify-email`,
        { otp: enteredOtp },
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        toast.success("Email verified successfully!");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Verification failed");
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
            Verify Email
          </h2>
          <p className="text-sm text-start text-gray-500 mb-8 mt-2">
            Enter the 6-digit OTP sent to your email.
          </p>

          <form onSubmit={handleVerify}>
            <div className="flex justify-between mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-xl border border-lilac_dark rounded-lg focus:ring-1 focus:ring-blue-400"
                />
              ))}
            </div>

            <div className="text-center text-gray-700 mb-4">
              {resendAvailable ? (
                <button className="text-lilac_dark hover:underline">
                  Resend OTP
                </button>
              ) : (
                <span>
                  Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="font-semibold w-full bg-lilac_dark text-white py-3 rounded-lg hover:bg-lilac focus:ring-2 focus:ring-blue-400"
            >
              Verify
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600">
            By creating an account, you agree to our
            <span className="text-lilac_dark hover:underline">
              {" "}
              Terms & Conditions
            </span>{" "}
            and
            <span className="text-lilac_dark hover:underline">
              {" "}
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
