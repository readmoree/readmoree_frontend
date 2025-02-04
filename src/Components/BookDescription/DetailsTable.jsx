import React from "react";

const DetailsTable = ({ book }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Product Details</h2>
      <table className="w-4/5 text-sm text-gray-700 text-left ml-0">
        <tbody>
          <tr className="odd:bg-gray-50 border-b">
            <td className="py-2 font-medium text-gray-600">Publisher</td>
            <td className="py-2">{book.publisher.name}</td>
          </tr>
          <tr className="odd:bg-gray-50 border-b">
            <td className="w-1/3 py-2 font-medium text-gray-600">ISBN</td>
            <td className="py-2">{book.isbn}</td>
          </tr>
          <tr className="odd:bg-gray-50 border-b">
            <td className="py-2 font-medium text-gray-600">Language</td>
            <td className="py-2">
              {book.language.replace(
                book.language.slice(1),
                book.language.slice(1).toLowerCase()
              )}
            </td>
          </tr>
          <tr className="odd:bg-gray-50 border-b">
            <td className="py-2 font-medium text-gray-600">Binding</td>
            <td className="py-2">
              {book.binding.replace(
                book.binding.slice(1),
                book.binding.slice(1).toLowerCase()
              )}
            </td>
          </tr>
          <tr className="odd:bg-gray-50">
            <td className="py-2 font-medium text-gray-600">Pages</td>
            <td className="py-2">{book.pageCount} Pages</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailsTable;
