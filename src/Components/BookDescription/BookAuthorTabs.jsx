import React, { useState } from "react";

const Tabs = ({ book }) => {
  const [activeTab, setActiveTab] = useState("description");
  const activeTabStyle = {
    opacity: 1,
    visibility: "visible",
    transition: "opacity 0.5s ease, visibility 0s 0s", // No delay for visibility change
  };
  const tabStyle = {
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.5s ease, visibility 0s 0.5s", // Delay visibility change
  };

  return (
    <div className="mt-8">
      <div className="flex border-b">
        <button
          className={`py-2 ${
            activeTab === "description"
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-600 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("description")}
        >
          Product Description
        </button>
        <button
          className={`py-2 mx-6 ${
            activeTab === "author"
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-600 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("author")}
        >
          About Author
        </button>
      </div>

      {/* Tab Content with Inline Fade Animation */}
      <div
        style={activeTab === "description" ? activeTabStyle : tabStyle}
        className="mt-4"
      >
        {activeTab === "description" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Product Description</h2>
            <p className="text-gray-700">{book.description}</p>
          </div>
        )}
      </div>
      <div
        style={activeTab === "author" ? activeTabStyle : tabStyle}
        className="mt-4"
      >
        {activeTab === "author" && (
          <div>
            <h2 className="text-xl font-bold mb-4">About Author</h2>
            <p className="text-gray-700">{book.author.about}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
