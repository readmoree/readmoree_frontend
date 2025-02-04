import { ChevronRight, X } from "lucide-react";
import { useState } from "react";

const AddressSelector = ({
  selectedAddress,
  addresses,
  handleAddressSelect,
}) => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  return (
    <div>
      <div className="border p-4 flex justify-between items-center">
        <p className="text-gray-700 font-semibold">Deliver to: </p>
        <div>
          {selectedAddress ? (
            <>
              <h3>{selectedAddress.addressLabel}</h3>
              <p className="text-sm text-gray-600">
                {selectedAddress.flatNo}, {selectedAddress.buildingName},{" "}
                {selectedAddress.locality}, {selectedAddress.city},{" "}
                {selectedAddress.state}, {selectedAddress.pincode}
              </p>
            </>
          ) : (
            "No address selected"
          )}
        </div>

        <button
          onClick={() => setIsAddressModalOpen(true)}
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
              onClick={() => setIsAddressModalOpen(false)}
              className="absolute top-6 right-5 text-gray-600 text-2xl"
            >
              <X className="text-gray-600 w-6 h-6" />
            </button>
            <h3 className="font-semibold text-lg mb-4">
              Select Delivery Address
            </h3>
            <ul className="space-y-4">
              {addresses.map((address) => (
                <li
                  key={address.address_id}
                  className="border p-3 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    handleAddressSelect(address);
                    setIsAddressModalOpen(false);
                  }}
                >
                  <div className="flex flex-col">
                    <h3>{address.addressLabel}</h3>
                    <p className="text-sm text-gray-600">
                      {address.flatNo}, {address.buildingName},{" "}
                      {address.locality}, {address.city}, {address.state},{" "}
                      {address.pincode}
                    </p>
                  </div>
                  <input
                    type="radio"
                    name="address"
                    checked={
                      selectedAddress &&
                      selectedAddress.address_id === address.address_id
                    }
                    readOnly
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSelector;
