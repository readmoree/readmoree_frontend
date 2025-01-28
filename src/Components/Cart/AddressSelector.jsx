/* Vivek@28/01 on VSCode */

import { ChevronRight, X } from "lucide-react";

const AddressSelector = ({
  selectedAddress,
  isAddressModalOpen,
  isNewAddressModalOpen,
  addresses,
  toggleAddressModal,
  toggleNewAddressModal,
  handleAddressSelect,
}) => {
  return (
    <div>
      <div className="border p-4 flex justify-between items-center">
        <p className="text-gray-700 font-semibold">
          Deliver to: <span className="text-gray-900">{selectedAddress}</span>
        </p>
        <button
          onClick={toggleAddressModal}
          className="bg-transparent p-2 hover:bg-gray-100 rounded-full flex items-center justify-center"
          aria-label="Change Address"
        >
          <ChevronRight className="text-gray-700 w-6 h-6" />
        </button>
      </div>

      {/* Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[500px] relative">
            <button
              onClick={toggleAddressModal}
              className="absolute top-6 right-5 text-gray-600 text-2xl"
            >
              <X className="text-gray-600 w-6 h-6" />
            </button>
            <h3 className="font-semibold text-lg mb-4">
              Select Delivery Address
            </h3>
            <ul className="space-y-4">
              {addresses.map((address, index) => (
                <li
                  key={index}
                  className="border p-3 flex justify-between items-center"
                >
                  <p>{address}</p>
                  <input
                    type="radio"
                    name="address"
                    value={address}
                    checked={selectedAddress === address}
                    onChange={() => handleAddressSelect(address)}
                    className="form-radio"
                  />
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4">
              <button
                onClick={toggleNewAddressModal}
                className="w-full bg-purple-600 text-white px-4 py-2 hover:bg-purple-700"
              >
                Add New Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Address Modal */}
      {isNewAddressModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[500px] relative">
            <button
              onClick={toggleNewAddressModal}
              className="absolute top-6 right-5 text-gray-600 text-2xl"
            >
              <X className="text-gray-600 w-6 h-6" />
            </button>
            <h3 className="font-semibold text-lg mb-4">Add New Address</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border p-2"
              />
              <input
                type="text"
                placeholder="Street Address"
                className="w-full border p-2"
              />
              <input
                type="text"
                placeholder="City"
                className="w-full border p-2"
              />
              <input
                type="text"
                placeholder="ZIP Code"
                className="w-full border p-2"
              />
              <button
                type="submit"
                className="w-full bg-purple-600 text-white px-4 py-2 hover:bg-purple-700"
              >
                Add Address
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSelector;
