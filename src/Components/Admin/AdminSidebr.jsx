import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { ImBooks } from "react-icons/im";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaClipboardList,
  FaChartPie,
  FaTags,
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Orders", path: "/admin/orders", icon: <FaClipboardList /> },
    { name: "Products", path: "/admin/products", icon: <FaBoxOpen /> },
    { name: "Stock", path: "/stock", icon: <FaBoxOpen /> },
    { name: "Offer", path: "/offers", icon: <FaTags /> },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem("toke");
    sessionStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="bg-lilac_dark h-screen min-w-64 px-5 flex flex-col py-6 text-white">
      {/* Admin Name */}
      <div
        className="flex items-center p-3 mb-5 cursor-pointer"
        onClick={() => navigate("/admin/dashboard")}
      >
        <ImBooks className="text-white text-5xl" />
        <span className="ml-2 font-bold text-2xl">READMOREE</span>
      </div>

      {/* Sidebar Links */}
      <nav className="flex flex-col gap-3 mt-5 relative">
        {menuItems.map((item) => (
          <div key={item.path} className="relative font-semibold text-lg">
            <Link
              to={item.path}
              className={`relative flex items-center gap-3 px-6 py-3 transition-all duration-300 
                ${
                  location.pathname === item.path
                    ? "bg-white text-lilac_dark rounded-l-full relative"
                    : "hover:bg-lilac hover:text-white rounded-l-full"
                }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>

            {/* Outer Right Curve Effect */}
            {location.pathname === item.path && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-12 bg-white rounded-l-full"></div>
            )}
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          className="w-full bg-white text-black py-2 rounded-lg hover:bg-lilac transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
