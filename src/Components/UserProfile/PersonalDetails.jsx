import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { updateUserData } from "../../services/user";
import { toast } from "react-toastify";

// with month name
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const PersonalDetails = ({ userData }) => {
  const { firstName, lastName, mobile, email, dob } = userData;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({
      firstName,
      lastName,
      mobile,
      email,
      dob,
    });
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);

    const response = await updateUserData(formData);
    if (response.status !== "success") {
      toast.error("Something went wrong! Please try again");
    } else {
      toast.success("Profile updated successfully!");
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Personal Details</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-black font-semibold flex items-center gap-1 bg-lilac_dark px-5 py-2 rounded-lg"
          >
            <FaEdit /> Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-white p-6 pl-2 rounded-md">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-lilac_dark rounded-lg focus:ring-1 focus:ring-blue-400"
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-lilac_dark rounded-lg focus:ring-1 focus:ring-blue-400"
                placeholder="Last Name"
              />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-lilac_dark rounded-lg focus:ring-1 focus:ring-blue-400"
              placeholder="Phone Number"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg text-gray-500"
              placeholder="Email Address"
            />
            <input
              type="date"
              name="dob"
              value={formData.dob.split("T")[0]}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-lilac_dark rounded-lg focus:ring-1 focus:ring-blue-400"
              readOnly
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full bg-lilac_dark text-white py-2 rounded-lg hover:bg-lilac focus:ring-2 focus:ring-blue-400"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="border rounded-md p-6 bg-white mt-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600 w-40">Full name:</span>
              <span className="font-semibold">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600 w-40">
                Phone number:
              </span>
              <span className="font-semibold">+91 {formData.mobile}</span>
              <FaCheckCircle className="text-green-500" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600 w-40">
                Email address:
              </span>
              <span className="font-semibold">{formData.email}</span>
              <FaCheckCircle className="text-green-500" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600 w-40">
                Date of Birth:
              </span>
              <span className="font-semibold">{formatDate(formData.dob)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalDetails;
