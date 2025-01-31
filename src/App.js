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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/:name" element={<BookDescription />} />
        <Route path="/search/:label" element={<CategorySearch />} />
        <Route path="/search/:label/:category" element={<CategorySearch />} />
        <Route
          path="/search/:label/:category/:subcategory"
          element={<CategorySearch />}
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book-details/:name" element={<BookDescription />} />
        <Route path="/cart" element={<CartScreen />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
