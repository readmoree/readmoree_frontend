import React, { useState } from "react";
import Navbar from "../Components/Navbar";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log({ newPassword });
    // Logic to reset the password
  };

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500"
        >
          Reset Password
        </button>
      </form>
    </div>
    </>
  );
};

export default ResetPassword;
