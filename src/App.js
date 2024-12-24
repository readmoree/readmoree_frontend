import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Dropdown from "./Components/Dropdown";
import CategorySearch from "./Pages/CategorySearch";
import ProductDes from "./Components/ProductDes";
import BookComponent from "./Screens/BookComponent";

function App() {
  return (
    <>
      {/* <CategorySearch /> */}
      <Navbar />
      <BookComponent />
      {/* <ProductDes /> */}
    </>
  );
}

export default App;
