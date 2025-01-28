/* Vivek@28/01 on VSCode */

const BookItem = () => {
  return (
    <div className="flex items-center border p-4">
      <img
        src="https://www.crossword.in/cdn/shop/files/71OUTeaNQBL._SL1500_1080x@2x.jpg?v=1724907752"
        alt="Protecting What's His"
        className="w-20 h-28 object-cover"
      />
      <div className="ml-4 flex-grow">
        <h3 className="font-semibold text-lg">Protecting What's His</h3>
        <p className="text-gray-600">
          ₹ 560{" "}
          <span className="line-through text-sm text-gray-500">₹ 660</span>{" "}
          <span className="text-green-600 text-sm">(10%)</span>
        </p>
        <div className="flex items-center mt-2">
          <label className="text-sm text-gray-600 flex items-center">
            <input type="checkbox" className="mr-2" /> Free Gift Wrap
          </label>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <select className="border px-2 py-1 text-gray-700" defaultValue={2}>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <p className="mt-2 font-medium">₹ 1120</p>
      </div>
    </div>
  );
};

export default BookItem;
