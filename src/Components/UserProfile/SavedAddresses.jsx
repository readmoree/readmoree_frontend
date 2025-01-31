import React, { useState } from "react";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";

const SavedAddresses = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      flatNo: "TCG 1303",
      building: "Skyline Towers",
      locality: "Hinjewadi Phase 2",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411057",
      isDefault: true,
    },
    {
      id: 2,
      name: "Work",
      flatNo: "101",
      building: "Sunset Villas",
      locality: "Downtown",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      isDefault: false,
    },
  ]);

  const userEmail = "borsev662@gmail.com";
  const userPhone = "7666045526";

  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: "",
    flatNo: "",
    building: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleEdit = (address) => {
    setIsEditing(true);
    setCurrentAddress(address);
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleSave = () => {
    if (currentAddress) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === currentAddress.id ? currentAddress : addr
        )
      );
    } else {
      let addressName = "Home";
      if (addresses.some((addr) => addr.name === "Home")) {
        addressName = addresses.some((addr) => addr.name === "Work")
          ? prompt("Enter a custom name for the address:")
          : "Work";
      }
      setAddresses([
        ...addresses,
        { ...newAddress, id: addresses.length + 1, name: addressName },
      ]);
    }
    setIsEditing(false);
    setCurrentAddress(null);
    setNewAddress({
      name: "",
      flatNo: "",
      building: "",
      locality: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((addr) => ({ ...addr, isDefault: addr.id === id }))
    );
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50">
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
            {Object.keys(newAddress).map((field) => (
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
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="mb-2">
              <label className="block font-medium">Email</label>
              <input
                type="text"
                className="border p-2 w-full rounded-md bg-gray-200 "
                value={userEmail}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Phone</label>
              <input
                type="text"
                className="border p-2 w-full rounded-md bg-gray-200"
                value={userPhone}
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
          <div
            key={address.id}
            className="border rounded-md p-6 bg-white shadow-sm mb-4"
          >
            <div className="flex justify-between items-center w-full mb-2">
              <h3 className="font-semibold text-lg">
                {address.name}{" "}
                {address.isDefault && (
                  <span className="text-xs bg-green-500 text-white px-4 py-0.5 rounded-md ml-2">
                    Default
                  </span>
                )}
              </h3>
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="text-lilac hover:underline"
                >
                  Set as default
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {address.flatNo}, {address.building}, {address.locality},{" "}
              {address.city}, {address.state}, {address.pincode}
            </p>
            <p className="text-sm text-gray-600">
              {userPhone} | {userEmail}
            </p>
            <div className="mt-5 flex gap-4">
              <button
                onClick={() => handleEdit(address)}
                className="flex items-center gap-1 text-black border border-lilac rounded-md px-4 py-1 bg-lilac"
              >
                <FiEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(address.id)}
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
