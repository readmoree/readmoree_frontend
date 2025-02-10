import { Edit, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { CiDiscount1 } from "react-icons/ci";
import UpdateBookModal from "../../Components/Admin/UpdateBookModal";

const BookCard = ({ book, openInventoryModal }) => {
  return (
    <div className="p-5 border rounded-xl bg-gray-50 w-64">
      <div className="flex justify-between items-center my-3 mt-1">
        <h3 className="text-lg font-semibold">
          {book.title.length > 18
            ? `${book.title.substring(0, 18)}...`
            : book.title}
        </h3>
        <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
      </div>
      <div className="flex flex-row gap-3">
        <div>
          <img
            src={book.image.split(" ")[0]}
            alt={book.title}
            className="w-fit h-32 object-cover rounded-md mb-2"
          />
        </div>
        <div className="mt-4">
          <p className="text-gray-500 text-xs font-semibold">{book.lables}</p>
          <p className="text-lg font-bold text-black">
            ₹{book.price.toFixed(2)}
          </p>
          <p className="text-sm flex items-center gap-1 text-green-600">
            <CiDiscount1 /> {book.discount}%
          </p>
        </div>
      </div>
      <div className="mt-3 p-2 border rounded-md bg-white">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-700">Sales</span>
          <span className="text-green-600 font-medium flex items-center gap-1">
            ↑ {book.sales || Math.floor(Math.random() * 100)}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm mt-1">
          <span className="text-gray-700">Remaining Products</span>
          <span>{book.totalAvailableCount}</span>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1 rounded-full mt-1">
        <div
          className="bg-lilac_dark h-1 rounded-full"
          style={{
            width: `${Math.floor(Math.random() * 100)}%`,
          }}
        ></div>
      </div>
      <button
        onClick={() => openInventoryModal(book)}
        className="mt-3 flex items-center gap-2 px-3 py-1 bg-lilac_dark text-white rounded-lg hover:bg-lilac w-full justify-center"
      >
        Update Details
      </button>
    </div>
  );
};

const BookList = ({ allBooks }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openInventoryModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeInventoryModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="flex flex-wrap gap-6">
      {allBooks.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          openInventoryModal={openInventoryModal}
        />
      ))}
      {isModalOpen && (
        <UpdateBookModal book={selectedBook} onClose={closeInventoryModal} />
      )}
    </div>
  );
};

export default BookList;
