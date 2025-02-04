import { Search, Bell } from "lucide-react";
import { useState } from "react";

const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-end space-x-4 p-3 px-10 py-5 bg-white m-3 rounded-lg shadow-md">
      {/* Search Icon */}
      <Search className="w-5 h-5 text-black cursor-pointer" />

      {/* Notification Bell */}
      <Bell className="w-5 h-5 text-black cursor-pointer" />

      {/* Admin Dropdown */}
      <div className="relative">
        <button className="flex items-center font-semibold px-6 py-2 border-2 border-black rounded-lg shadow-sm">
          ADMIN
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
