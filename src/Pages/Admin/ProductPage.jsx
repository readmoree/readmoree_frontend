import { useState } from "react";
import { Plus, X, Edit, ChevronDown } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Sidebar from "../../Components/Admin/AdminSidebr";
import AdminHeader from "../../Components/Admin/AdminHeader";
import { FiSearch } from "react-icons/fi";
import BookList from "../../Components/Admin/BookList";
const categories = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "History",
  "Biography",
];

const initialBooks = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    publisher: "HarperCollins",
    image: "https://m.media-amazon.com/images/I/71aFt4+OTOL._SL1500_.jpg",
    price: "₹499",
    publicationDate: "1988",
    pageCount: 208,
    isbn: "978-0062315007",
    language: "English",
    binding: "Paperback",
    description: "A journey of self-discovery and following your dreams.",
    category: "Fiction",
    stock: 10,
  },
];

export default function ProductsPage() {
  const [books, setBooks] = useState(initialBooks);
  const [selectedCategory, setSelectedCategory] = useState("Fiction");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newStock, setNewStock] = useState("");

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publisher: "",
    image: "",
    price: "",
    publicationDate: "",
    pageCount: "",
    isbn: "",
    language: "",
    binding: "",
    description: "",
    category: "",
    stock: "",
  });

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBooks([
      ...books,
      { ...newBook, id: books.length + 1, stock: Number(newBook.stock) || 0 },
    ]);
    setIsModalOpen(false);
    setNewBook({
      title: "",
      author: "",
      publisher: "",
      image: "",
      price: "",
      publicationDate: "",
      pageCount: "",
      isbn: "",
      language: "",
      binding: "",
      description: "",
      category: "",
      stock: "",
    });
  };

  const openInventoryModal = (book) => {
    setSelectedBook(book);
    setNewStock(book.stock);
    setIsInventoryModalOpen(true);
  };

  const handleInventoryUpdate = (e) => {
    e.preventDefault();
    if (selectedBook) {
      setBooks(
        books.map((book) =>
          book.id === selectedBook.id
            ? { ...book, stock: Number(newStock) }
            : book
        )
      );
      setIsInventoryModalOpen(false);
    }
  };

  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <div className="flex max-h-screen">
      <Sidebar />

      <div className="flex flex-col w-full">
        <div>
          <AdminHeader />
        </div>
        <div className="px-14 py-6 space-y-6 flex-1 bg-white m-3 mt-5 rounded-lg shadow-md overflow-y-scroll">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <div>
                <h2 className="text-2xl font-bold">All Books</h2>
              </div>

              {/* Category Filter Dropdown */}
              <DropdownMenu.Root className="">
                <DropdownMenu.Trigger className="flex items-center gap-2 px-6 py-2 bg-white border border-lilac_dark rounded-lg cursor-pointer font-bold">
                  {selectedCategory} Books
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="bg-white shadow-md rounded-lg p-2 px-6">
                  {categories.map((category) => (
                    <DropdownMenu.Item
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="cursor-pointer p-2 px-6 hover:bg-gray-200"
                    >
                      {category}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>

            {/* Add New Book Button */}
            <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
              <Dialog.Trigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 bg-lilac_dark font-bold text-white rounded-lg shadow-md hover:bg-blue-700">
                  <Plus className="w-5 h-5" />
                  Add New Book
                </button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 bg-white p-2 px-4 rounded-lg shadow-lg overflow-hidden">
                  <div className="w-full flex justify-center items-center">
                    <div className="bg-white py-8 px-6 w-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-3xl font-bold text-gray-700">
                            Add New Book
                          </h2>
                          <p className="text-sm text-gray-500 mb-6 mt-2">
                            Expand your bookstore with amazing new titles!
                          </p>
                        </div>
                        <Dialog.Close asChild>
                          <button className="flex items-end">
                            <X className="w-5 h-5" />
                          </button>
                        </Dialog.Close>
                      </div>

                      <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-2 gap-3 w-full"
                      >
                        <input
                          type="text"
                          name="title"
                          value={newBook.title}
                          onChange={handleChange}
                          placeholder="Title"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-lilac_dark"
                          required
                        />
                        <input
                          type="text"
                          name="author"
                          value={newBook.author}
                          onChange={handleChange}
                          placeholder="Author"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-lilac_dark"
                          required
                        />

                        <input
                          type="text"
                          name="publisher"
                          value={newBook.publisher}
                          onChange={handleChange}
                          placeholder="Publisher"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-lilac_dark"
                        />
                        <input
                          type="url"
                          name="image"
                          value={newBook.image}
                          onChange={handleChange}
                          placeholder="Image URL"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-lilac_dark"
                          required
                        />

                        <input
                          type="number"
                          name="price"
                          value={newBook.price}
                          onChange={handleChange}
                          placeholder="Price (₹)"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-lilac_dark"
                          required
                        />
                        <input
                          type="date"
                          name="publicationDate"
                          value={newBook.publicationDate}
                          onChange={handleChange}
                          placeholder="Publication Date"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-lilac_dark"
                        />

                        <input
                          type="number"
                          name="pageCount"
                          value={newBook.pageCount}
                          onChange={handleChange}
                          placeholder="Page Count"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-lilac_dark"
                        />
                        <input
                          type="text"
                          name="isbn"
                          value={newBook.isbn}
                          onChange={handleChange}
                          placeholder="ISBN"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-lilac_dark"
                        />

                        <input
                          type="text"
                          name="language"
                          value={newBook.language}
                          onChange={handleChange}
                          placeholder="Language"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-lilac_dark"
                        />
                        <input
                          type="text"
                          name="binding"
                          value={newBook.binding}
                          onChange={handleChange}
                          placeholder="Binding (Hardcover/Paperback)"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-lilac_dark"
                        />

                        {/* Full-width Fields */}
                        <textarea
                          name="description"
                          value={newBook.description}
                          onChange={handleChange}
                          placeholder="Description"
                          className="col-span-2 w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-lilac_dark"
                          required
                        />

                        <select
                          name="category"
                          value={newBook.category}
                          onChange={handleChange}
                          className="w-full px-3  py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-lilac_dark"
                          required
                        >
                          <option value="">Select Label</option>
                          {categories.slice(1).map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>

                        <select
                          name="category"
                          value={newBook.category}
                          onChange={handleChange}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-lilac_dark"
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.slice(1).map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>

                        <select
                          name="category"
                          value={newBook.category}
                          onChange={handleChange}
                          className="w-full px-3  py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-lilac_dark"
                          required
                        >
                          <option value="">Select Subcategory</option>
                          {categories.slice(1).map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>

                        <input
                          type="number"
                          name="stock"
                          value={newBook.stock}
                          onChange={handleChange}
                          placeholder="Stock Quantity"
                          className="w-full px-3  py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-lilac_dark"
                          required
                        />

                        <button
                          type="submit"
                          className="mt-3 col-span-2 w-full bg-lilac_dark text-white py-3 rounded-lg hover:bg-lilac focus:ring-2 focus:ring-blue-400"
                        >
                          Add Book
                        </button>
                      </form>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          {/* Books Grid */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="p-4 border rounded-lg shadow-md bg-white"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600">Stock: {book.stock}</p>
                <button
                  onClick={() => openInventoryModal(book)}
                  className="mt-2 flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Edit className="w-4 h-4" /> Update Inventory
                </button>
              </div>
            ))}
          </div> */}
          <BookList />
        </div>
      </div>

      {/* Inventory Update Modal */}
      {isInventoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Update Inventory</h3>
            <form onSubmit={handleInventoryUpdate} className="space-y-4">
              <input
                type="number"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
              >
                Update Stock
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
