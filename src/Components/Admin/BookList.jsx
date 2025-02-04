import { Edit, MoreHorizontal } from "lucide-react";
import { CiDiscount1 } from "react-icons/ci";

const books = [
  {
    id: 1,
    title: "Where The Wild",
    category: "Fiction",
    price: 110.4,
    image:
      "https://bookscape.com/product-details/the-content-creator-handbook-9780143465225", // Placeholder image
    description:
      "Lorem ipsum is placeholder text commonly used in the graphic.",
    sales: 1269,
    stock: 1269,
    totalStock: 2000,
  },
  {
    id: 2,
    title: "Deep Work",
    category: "Self Improvement",
    price: 399.99,
    image:
      "https://bookscape.com/product-details/the-content-creator-handbook-9780143465225",
    description: "A book about focused success in a distracted world.",
    sales: 750,
    stock: 300,
    totalStock: 1000,
  },
  {
    id: 2,
    title: "Deep Work",
    category: "Self Improvement",
    price: 399.99,
    image:
      "https://bookscape.com/product-details/the-content-creator-handbook-9780143465225",
    description: "A book about focused success in a distracted world.",
    sales: 750,
    stock: 300,
    totalStock: 1000,
  },
  {
    id: 2,
    title: "Deep Work",
    category: "Self Improvement",
    price: 399.99,
    image:
      "https://bookscape.com/product-details/the-content-creator-handbook-9780143465225",
    description: "A book about focused success in a distracted world.",
    sales: 750,
    stock: 300,
    totalStock: 1000,
  },
  {
    id: 2,
    title: "Deep Work",
    category: "Self Improvement",
    price: 399.99,
    image:
      "https://bookscape.com/product-details/the-content-creator-handbook-9780143465225",
    description: "A book about focused success in a distracted world.",
    sales: 750,
    stock: 300,
    totalStock: 1000,
  },
];

const BookCard = ({ book, openInventoryModal }) => {
  return (
    <div className="p-5 border rounded-xl bg-gray-50 w-64">
      {/* More options button */}
      <div className="flex justify-between items-center my-3 mt-1">
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
      </div>

      <div className="flex flex-row gap-3">
        <div>
          {/* Image */}
          <img
            src="https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:317:447:0/gravity:sm/plain/https%3A%2F%2Fimage-hub.reproindialtd.com%2F9780143465225.jpg"
            alt={book.title}
            className="w-fit h-32 object-cover rounded-md mb-2"
          />
        </div>
        <div className="mt-4">
          {/* Subtitle */}
          <p className="text-gray-500 text-sm">{book.category}</p>

          {/* Price */}
          <p className="text-lg font-bold text-black">
            ₹{book.price.toFixed(2)}
          </p>
          <p className="text-sm flex items-center gap-1 text-green-600">
            <CiDiscount1 />
            23%
          </p>
        </div>
      </div>

      {/* Sales & Inventory Info */}
      <div className="mt-3 p-2 border rounded-md bg-white">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-700">Sales</span>
          <span className="text-green-600 font-medium flex items-center gap-1">
            ↑ {book.sales}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm mt-1">
          <span className="text-gray-700">Remaining Products</span>
          <span>{book.stock}</span>
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-1 rounded-full mt-1">
          <div
            className="bg-lilac_dark h-1 rounded-full"
            style={{ width: `${(book.stock / book.totalStock) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Update Inventory Button */}
      <button
        onClick={() => openInventoryModal(book)}
        className="mt-3 flex items-center gap-2 px-3 py-1 bg-lilac_dark text-white rounded-lg hover:bg-lilac w-full justify-center"
      >
        Update Details
      </button>
    </div>
  );
};

const BookList = () => {
  const openInventoryModal = (book) => {
    alert(`Update inventory for: ${book.title}`);
  };

  return (
    <div className="flex flex-wrap gap-6 justify-between">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          openInventoryModal={openInventoryModal}
        />
      ))}
    </div>
  );
};

export default BookList;
