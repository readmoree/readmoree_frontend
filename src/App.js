import "./App.css";

import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Register from "./Pages/Signup";
import BookDescription from "./Screens/BookDescriptionScreen";
import CartScreen from "./Screens/CartScreen";
import { ToastContainer } from "react-toastify";
import CategorySearch from "./Pages/CategorySearch";
import VerifyEmail from "./Pages/VerifyEmail";
import Profile from "./Pages/UserProfile";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Wishlist from "./Pages/Wishlist";
import OrderConfirmation from "./Pages/OrderConfirmation";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import OrderDashboard from "./Pages/Admin/OrdersPage";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductsPage from "./Pages/Admin/ProductPage";
import { registerLicense } from "@syncfusion/ej2-base";
import Search from "./Screens/Search";
import Unauthorized from "./Pages/Unauthorized";
import NotFound from "./Pages/NotFound";
import OrderDetails from "./Pages/OrderDetails";

let key =
  "Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhLYVJ3WmFZfVtgdV9HZFZSQWYuP1ZhSXxWdkdjXX9fcXBWQ2JbWUM=";
registerLicense(key);

function App() {
  return (
    <>
      <Routes>
        {/* non restricted routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:label" element={<CategorySearch />} />
        <Route path="/search/:label/:category" element={<CategorySearch />} />
        <Route
          path="/search/:label/:category/:subcategory"
          element={<CategorySearch />}
        />
        <Route path="/book-details/:id" element={<BookDescription />} />

        {/* customer routers */}
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              element={<Profile />}
              allowedRoles={["CUSTOMER", "ADMIN"]}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute
              element={<CartScreen />}
              allowedRoles={["CUSTOMER"]}
            />
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute
              element={<Wishlist />}
              allowedRoles={["CUSTOMER"]}
            />
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <ProtectedRoute
              element={<OrderConfirmation />}
              allowedRoles={["CUSTOMER"]}
            />
          }
        />

        <Route
          path="/order/:orderId"
          element={
            <ProtectedRoute
              element={<OrderDetails />}
              allowedRoles={["CUSTOMER"]}
            />
          }
        />

        {/* admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              allowedRoles={["ADMIN"]}
            />
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute
              element={<OrderDashboard />}
              allowedRoles={["ADMIN"]}
            />
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute
              element={<ProductsPage />}
              allowedRoles={["ADMIN"]}
            />
          }
        />

        {/* utility routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
