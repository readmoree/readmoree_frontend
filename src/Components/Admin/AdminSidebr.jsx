import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { ImBooks } from "react-icons/im";

export default function Sidebar() {
  const location = useLocation(); // Get the current route

  const navigate = useNavigate();

  return (
    <div className="bg-lilac_dark h-screen min-w-64 px-5 flex flex-col py-6">
      {/* Admin Name */}
      <div
        className="flex items-center p-3 mb-5"
        onClick={() => navigate("/admin/dashboard")}
      >
        <ImBooks className="text-black text-5xl" />
        <span className="ml-1 font-bold text-2xl">READMOREE</span>
        <br />
      </div>

      {/* Sidebar Links */}
      <nav className="flex flex-col gap-4 font-bold mt-5 ">
        {[
          { name: "Dashboard", path: "/admin/dashboard" },
          { name: "Orders", path: "/admin/orders" },
          { name: "Products", path: "/admin/products" },
          { name: "Stock", path: "/stock" },
          { name: "Offers", path: "/offers" },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`p-3 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-white text-black"
                : "hover:bg-black hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-lilac">
          Logout
        </button>
      </div>
    </div>
  );
}
