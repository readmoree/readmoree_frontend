import { useEffect, useState } from "react";
import AddressSelector from "../Components/Cart/AddressSelector";
import BookItem from "../Components/Cart/BookItem";
import CouponSelector from "../Components/Cart/CouponSelector";
import OrderSummary from "../Components/Cart/OrderSummary";
import PaymentMode from "../Components/Cart/PaymentMode";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import LoadingPage from "../Pages/LoadingPage";

const CartScreen = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [bookQuantities, setBookQuantities] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [loading, setLoading] = useState(true);

  const [paymentMode, setPaymentMode] = useState("");

  const handlePaymentModeChange = (event) => {
    setPaymentMode(event.target.value);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  useEffect(() => {
    getCartBooks();
    fetchAddresses();
    calculateAmountPayable();
  }, []);

  useEffect(() => {
    calculateAmountPayable();
  }, [books, bookQuantities]); // Recalculate when books or quantities change

  // place order function to make api call
  const makePayment = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token not found. Please log in.");
        alert("Please log in to place an order.");
        return;
      }

      const stripe = await loadStripe(
        "pk_test_51QoHczGgebrKK2S2hcYBqgFeW8txTJrbc1T9ycn6XyDKt7L1JItyNYL6Ww239TofQPJNBnGuJ5DLhVuwvVM5k03400Bw9gPlMM"
      );

      if (!stripe) {
        console.error("Stripe failed to load.");
        alert("Payment service unavailable. Please try again later.");
        return;
      }

      // Prepare order data
      const body = books.map((book, index) => ({
        title: book.title,
        quantity: bookQuantities[index],
        price: book.price,
      }));

      const response = await axios.post(
        "http://localhost:4000/api/create-checkout-session",
        { products: body },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const session = response.data;

      if (!session.id) {
        console.error("Invalid session response:", session);
        alert("Failed to create checkout session. Please try again.");
        return;
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error("Stripe Checkout Error:", result.error);
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  const placeOrder = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token not found. Please log in.");
        return;
      }
      const orderDetailsforInvoice = books.map((book, index) => ({
        name: book.title,
        quantity: bookQuantities[index],
        price: book.price,
        discount: book.discount,
      }));
      console.log("Calling Place Order Method");
      const orderDetails = books.map((book, index) => ({
        bookId: book.id,
        quantity: bookQuantities[index],
        price: book.price,
      }));
      console.log(orderDetails);
      console.log(process.env.REACT_APP_ORDER_SERVICE_URL);
      const orderResponse = await axios.post(
        `${process.env.REACT_APP_ORDER_SERVICE_URL}/orders/placeOrder`,
        orderDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            addressId: selectedAddress.addressId,
            paymentMethod: paymentMode,
          },
        }
      );
      if (orderResponse.status === 200) {
        console.log(orderResponse);
        await makeCartEmpty();

        const invoiceDetails = {
          items: orderDetailsforInvoice,
          orderId: orderResponse.data.orderId,
          billingAddress: selectedAddress,
          shippingAddress: selectedAddress,
        };

        const invoiceRes = await axios.post(
          "http://localhost:4000/api/send-invoice",
          invoiceDetails,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (invoiceRes.status == 200) {
          // toast.success(orderResponse.data.message);
          await makePayment();
          // navigate("/order-confirmation");
        }
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const makeCartEmpty = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token not found. Please log in.");
        return;
      }
      console.log("Calling Place Order Method");
      const orderDetails = books.map((book, index) => ({
        bookId: book.id,
        quantity: bookQuantities[index],
        price: book.price,
      }));
      console.log(orderDetails);
      const response = await axios.delete(
        `${process.env.REACT_APP_CART_SERVICE_URL}/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Fetch Cart Books
  const getCartBooks = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token not found. Please log in.");
        return;
      }

      console.log(process.env.REACT_APP_CART_SERVICE_URL);
      const response = await axios.get(
        `${process.env.REACT_APP_CART_SERVICE_URL}/cart`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.data.books) setBooks(response.data.data.books);
      if (response.data.data.quantitiesOfBooks)
        setBookQuantities(response.data.data.quantitiesOfBooks);
      console.log(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching cart books:",
        error.response?.data || error.message
      );
    }
  };

  // Fetch Addresses and Set Default
  const fetchAddresses = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token not found. Please log in.");
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_USER_SERVICE_URL}/user/address`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.data.length > 0) {
        setAddresses(response.data.data);

        // Set the default address (where is_default === 1)
        const defaultAddress = response.data.data.find(
          (addr) => addr.is_default === 1
        );
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        } else {
          setSelectedAddress(response.data.data[0]); // Fallback to first address
        }
        console.log(response.data.data);
      }
    } catch (error) {
      console.error(
        "Error fetching addresses:",
        error.response?.data || error.message
      );
    }
  };

  // Function to handle address selection
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  // Calculate Total Amount & Savings
  const calculateAmountPayable = () => {
    let total = 0;
    let savings = 0;

    books.forEach((book, index) => {
      const quantity = bookQuantities[index] || 1;
      const price = book.price;
      const discount = book.discount;

      const bookAmount = price * quantity;
      const bookSavings = (price * discount * quantity) / 100;

      total += bookAmount;
      savings += bookSavings;
    });

    setTotalAmount(total.toFixed(2));
    setTotalSavings(savings.toFixed(2));
  };

  const handleDeleteBook = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    setBookQuantities((prevQuantities) =>
      prevQuantities.filter((_, index) => books[index].id !== bookId)
    );
  };

  const handleMoveToWishlist = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    setBookQuantities((prevQuantities) =>
      prevQuantities.filter((_, index) => books[index].id !== bookId)
    );
  };
  const updateQuantity = (bookId, newQty) => {
    setBookQuantities((prevQuantities) => {
      const updatedQuantities = prevQuantities.map((qty, index) =>
        books[index].id === bookId ? newQty : qty
      );

      return updatedQuantities;
    });

    // Call calculateAmountPayable after bookQuantities updates
    setTimeout(() => {
      calculateAmountPayable();
    }, 0);
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <Navbar />
      <div className="max-w-6xl my-10 mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Section */}
          <div className="flex flex-col w-full md:w-3/5 space-y-6">
            {/* Address Selector */}
            <AddressSelector
              selectedAddress={selectedAddress}
              addresses={addresses}
              handleAddressSelect={handleAddressSelect}
            />

            {/* Book List */}
            {books.map((book, index) => (
              <BookItem
                key={book.id}
                details={book}
                quantity={bookQuantities[index]}
                onDelete={handleDeleteBook}
                onMoveToWishlist={handleMoveToWishlist} // Pass onDelete function
                updateBookQuantity={(newQty) => updateQuantity(book.id, newQty)}
              />
            ))}
          </div>

          {/* Right Section */}
          <div className="w-full md:w-2/5 flex-shrink-0">
            {/* Coupon Selection */}
            <CouponSelector />

            <div className="border p-6 bg-white">
              {/* Order Summary */}
              <OrderSummary
                amountPayable={totalAmount}
                savings={totalSavings}
              />

              {/* Payment Modes */}
              <PaymentMode
                paymentMode={paymentMode}
                handlePaymentModeChange={handlePaymentModeChange}
              />

              <button
                className="w-full bg-lilac_dark text-white py-2 mt-6 hover:bg-purple-700"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartScreen;
