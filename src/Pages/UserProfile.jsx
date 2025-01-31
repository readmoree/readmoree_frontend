import Navbar from "../Components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import OrderList from "../Components/UserProfile/OrderList";
import PersonalDetails from "../Components/UserProfile/PersonalDetails";
import SavedAddresses from "../Components/UserProfile/SavedAddresses";
import MyReviews from "../Components/UserProfile/MyReviews";
import { MdKeyboardArrowDown } from "react-icons/md";
import Footer from "../Components/Footer";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [userAddress, setUserAddress] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isOthersMenuOpen, setIsOtherMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = 33; // Replace with dynamic logged-in user ID
        const userResponse = await axios.get(
          `http://localhost:5000/api/user/${userId}`
        );
        setUserData(userResponse.data);

        const addressResponse = await axios.get(
          `http://localhost:5000/api/address/${userId}`
        );
        setUserAddress(addressResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const renderActiveComponent = () => {
    switch (activeSection) {
      case "profile":
        return <PersonalDetails userData={userData} />;
      case "orders":
        return <OrderList userId={userData?.customer_id} />;
      case "addresses":
        return <SavedAddresses userAddress={userAddress} />;
      case "reviews":
        return <MyReviews userId={userData?.customer_id} />;
      default:
        return <PersonalDetails userData={userData} />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row my-10 mx-4 lg:mx-16">
        {/* Sidebar */}
        <div className="lg:min-w-[300px] lg:mx-5 bg-gray-50 border border-gray-300 rounded-lg p-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <div className="relative">
              <img
                src="https://images.vexels.com/content/147101/preview/instagram-profile-button-68a534.png"
                alt="Profile"
                className="h-28 w-24 lg:w-28 lg:h-28 rounded-full border border-gray-300"
              />
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold text-gray-800">
                {userData
                  ? `${userData.first_name} ${userData.last_name}`
                  : "Loading..."}
              </h3>
              <p className="text-md text-gray-500">
                {userData ? `${userData.mobile} ✅` : ""}
              </p>
            </div>
          </div>

          <hr className="my-5" />

          {/* Account Details Menu */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <h4 className="text-gray-800 text-lg font-bold">
                Account Details
              </h4>
              <span className={`transform ${isMenuOpen ? "rotate-180" : ""}`}>
                <MdKeyboardArrowDown />
              </span>
            </div>
            {isMenuOpen && (
              <ul className="mt-4 space-y-2">
                {[
                  { id: "profile", label: "My Profile" },
                  { id: "orders", label: "My Orders" },
                  { id: "addresses", label: "Saved Addresses" },
                  { id: "reviews", label: "My Reviews" },
                ].map((item) => (
                  <li
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`px-4 py-2 text-md rounded-md cursor-pointer transition-colors duration-200 hover:bg-lilac ${
                      activeSection === item.id ? "bg-lilac font-medium" : ""
                    }`}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <hr className="my-5" />

          {/* Other Details Menu */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsOtherMenuOpen(!isOthersMenuOpen)}
            >
              <h4 className="text-gray-800 text-lg font-bold">Others</h4>
              <span
                className={`transform ${isOthersMenuOpen ? "rotate-180" : ""}`}
              >
                <MdKeyboardArrowDown />
              </span>
            </div>
            {isOthersMenuOpen && (
              <ul className="mt-4 space-y-2">
                {[
                  { id: "faqs", label: "FAQ's" },
                  { id: "support", label: "Help & Support" },
                  { id: "privacy", label: "Privacy Policy" },
                  { id: "about", label: "About" },
                  { id: "signout", label: "Sign Out" },
                ].map((item) => (
                  <li
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`px-4 py-2 text-md rounded-md cursor-pointer transition-colors duration-200 hover:bg-lilac ${
                      activeSection === item.id ? "bg-lilac font-medium" : ""
                    }`}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow border border-gray-300 rounded-lg p-5">
          {renderActiveComponent()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
