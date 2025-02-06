import { Search, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { GrUserAdmin } from "react-icons/gr";

const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminName, setAdminName] = useState("");

  const getAdminDetails = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:4000/admin/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        console.log(response);
        setAdminName(
          response.data.data.firstName + " " + response.data.data.lastName
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAdminDetails();
  }, []);

  return (
    <div className="flex items-center justify-end space-x-4 p-3 px-10 py-3 bg-white m-3 rounded-lg shadow-md">
      {/* Search Icon */}
      <Search className="w-5 h-5 text-black cursor-pointer" />

      {/* Notification Bell */}
      <Bell className="w-5 h-5 text-black cursor-pointer" />

      {/* Admin Dropdown */}
      <div className="relative">
        <button className="flex items-center font-bold px-6 py-2 border-2 border-black rounded-lg shadow-sm">
          <GrUserAdmin className="mr-1 text-lg font-extrabold" />
          {adminName}
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
