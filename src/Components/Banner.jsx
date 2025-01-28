import React from "react";

const Banner = () => {
  return (
    // <div className="max-w-7xl mx-auto p-4">
    <div className="flex items-center justify-center py-10 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gifting Store Section */}
        <div className="relative bg-pink-50 rounded-lg p-8 overflow-hidden">
          {/* Gold sparkle overlay */}
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-yellow-200 to-transparent"></div>

          <div className="relative flex items-center justify-between">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                The Gifting Store
              </h2>
              <p className="text-lg text-gray-600">
                Find The Perfect Gift For Everyone!
              </p>
              <button className="px-6 py-2 bg-white text-gray-800 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors">
                SHOP NOW
              </button>
            </div>

            {/* <div className="relative">
              <div className="w-32 h-32 relative">
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-coral-500 rounded-lg transform rotate-6"></div>
                <div className="absolute top-0 left-0 w-24 h-24 bg-coral-400 rounded-lg transform -rotate-12">
                  <div className="absolute -top-4 left-0 w-12 h-6 bg-orange-300 rounded-full transform -rotate-45"></div>
                </div>
              </div>
            </div> */}
            <div className="flex gap-4 transform rotate-12">
              <img
                src="/api/placeholder/180/280"
                alt="Dune Book Cover"
                className="w-32 h-48 object-cover rounded-md shadow-lg"
              />
              <img
                src="/api/placeholder/180/280"
                alt="A Thousand Splendid Suns Book Cover"
                className="w-32 h-48 object-cover rounded-md shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Clearance Corner Section */}
        <div className="relative bg-orange-50 rounded-lg p-8 overflow-hidden">
          <div className="relative flex items-center justify-between">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                Clearance Corner
              </h2>
              <p className="text-lg text-amber-600">Upto 70% Off</p>
              <button className="px-6 py-2 bg-white text-gray-800 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors">
                SHOP NOW
              </button>
            </div>

            <div className="flex gap-4 transform rotate-12">
              <img
                src="/api/placeholder/180/280"
                alt="Dune Book Cover"
                className="w-32 h-48 object-cover rounded-md shadow-lg"
              />
              <img
                src="/api/placeholder/180/280"
                alt="A Thousand Splendid Suns Book Cover"
                className="w-32 h-48 object-cover rounded-md shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
