import React, { useState } from "react";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";
import {
  addAddress,
  deleteAddress,
  editAddress,
  setDefaultAddress,
} from "../../services/user";
import { toast } from "react-toastify";

const SavedAddresses = ({ userData }) => {
  const [addresses, setAddresses] = useState(userData.addresses);

  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    addressLabel: "",
    flatNo: "",
    buildingName: "",
    locality: "",
    area: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
    isDefault: 0,
  });

  const handleEdit = (address) => {
    setIsEditing(true);
    setCurrentAddress(address);
  };

  const handleDelete = async (id) => {
    const response = await deleteAddress(id);
    if (response.status !== "success") {
      toast.error("Something went wrong! Please try again");
    } else {
      toast.success("Address deleted successfully!");
    }
    setAddresses(addresses.filter((addr) => addr.addressId !== id));
  };

  const handleSave = async () => {
    if (currentAddress) {
      const response = await editAddress(currentAddress);
      console.log(response);
      if (response.status !== "success") {
        toast.error("Something went wrong! Please try again");
      } else {
        toast.success("Address updated successfully!");
      }
      setAddresses(
        addresses.map((addr) =>
          addr.addressId === currentAddress.addressId ? currentAddress : addr
        )
      );
    } else {
      const response = await addAddress(newAddress);
      if (response.status !== "success") {
        toast.error("Something went wrong! Please try again");
      } else {
        toast.success("Address added successfully!");
      }
      setAddresses([
        ...addresses,
        { ...newAddress, addressId: response.insertedId },
      ]);
    }
    setIsEditing(false);
    setCurrentAddress(null);
    setNewAddress({
      addressLabel: "",
      flatNo: "",
      buildingName: "",
      locality: "",
      area: "",
      city: "",
      district: "",
      state: "",
      country: "",
      pincode: "",
      isDefault: 0,
    });
  };

  const handleSetDefault = async (id) => {
    console.log(addresses);
    const response = await setDefaultAddress(id);

    if (response.status !== "success") {
      toast.error("Something went wrong! Please try again");
    } else {
      toast.success("Successfully changed default address!");
    }
    setAddresses(
      addresses.map((addr) =>
        addr.addressId === id
          ? { ...addr, isDefault: 1 }
          : { ...addr, isDefault: 0 }
      )
    );
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Saved Addresses</h2>
        <button
          onClick={() => {
            setIsEditing(true);
            setCurrentAddress(null);
          }}
          className="text-black flex items-center gap-1 bg-lilac px-3 py-2 rounded-md"
        >
          <FiPlus /> Add new address
        </button>
      </div>

      {isEditing ? (
        <div className="border rounded-md p-8 bg-white">
          <h3 className="text-2xl font-bold mb-6  w-1/2">
            {currentAddress ? "Edit Address" : "Add New Address"}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.keys(newAddress).map((field) =>
              field === "isDefault" ? (
                ""
              ) : (
                <div key={field} className="">
                  <label className="block font-medium mb-1">
                    {field
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <input
                    type="text"
                    className="border p-2 py-1 w-full rounded-md border-lilac_dark"
                    value={
                      currentAddress ? currentAddress[field] : newAddress[field]
                    }
                    onChange={(e) =>
                      currentAddress
                        ? setCurrentAddress({
                            ...currentAddress,
                            [field]: e.target.value,
                          })
                        : setNewAddress({
                            ...newAddress,
                            [field]: e.target.value,
                          })
                    }
                  />
                </div>
              )
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="mb-2">
              <label className="block font-medium">Email</label>
              <input
                type="text"
                className="border p-2 w-full rounded-md bg-gray-200 "
                value={userData.email}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Phone</label>
              <input
                type="text"
                className="border p-2 w-full rounded-md bg-gray-200"
                value={userData.mobile}
                disabled
              />
            </div>
          </div>
          <div className="flex gap-3 mt-3">
            <button
              onClick={handleSave}
              className="bg-lilac_dark text-white px-4 py-2 rounded-md w-1/2"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-black text-white px-4 py-2 rounded-md w-1/2"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        addresses.map((address) => (
          <div key={address.id} className="border rounded-md p-6 bg-white mb-4">
            <div className="flex justify-between items-center w-full mb-2">
              <h3 className="font-semibold text-lg">
                {address.addressLabel}{" "}
                {address.isDefault === 1 && (
                  <span className="text-xs bg-green-500 text-white px-4 py-0.5 rounded-md ml-2">
                    Default
                  </span>
                )}
              </h3>
              {address.isDefault === 0 && (
                <button
                  onClick={() => handleSetDefault(address.addressId)}
                  className="text-lilac hover:underline"
                >
                  Set as default
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {address.flatNo}, {address.buildingName}, {address.locality},{" "}
              {address.city}, {address.state}, {address.pincode}
            </p>
            <p className="text-sm text-gray-600">
              {userData.mobile} | {userData.email}
            </p>
            <div className="mt-5 flex gap-4">
              <button
                onClick={() => handleEdit(address)}
                className="flex items-center gap-1 text-black border border-lilac rounded-md px-4 py-1 bg-lilac"
              >
                <FiEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(address.addressId)}
                className="flex items-center gap-1 text-white bg-black rounded-md px-4 py-1 hover:bg-red-100"
              >
                <FiTrash /> Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedAddresses;
