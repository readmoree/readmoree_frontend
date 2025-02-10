import React from "react";
import { Link } from "react-router-dom";

const bookImages = [
  "https://s3-ap-south-1.amazonaws.com/bookscape-s3-bucket/13584AEA4DFiction1.png",
  "https://s3-ap-south-1.amazonaws.com/bookscape-s3-bucket/478492BDD6Fiction2.png",
];

const Fiction = () => {
  return (
    <div className=" flex flex-row justify-between px-10 py-5 shadow-sm ">
      {/* Categories (First 3 columns) */}
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-1.5">
          <Link
            to="/search/fiction/romance"
            className="text-lg font-semibold hover:text-gray-600"
          >
            Romance
          </Link>
          <Link
            to="/search/fiction/romance/anthologies"
            className="space-y-1 hover:text-gray-600"
          >
            Anthologies
          </Link>
          <Link
            to="/search/fiction/romance/contemporary"
            className="space-y-1 hover:text-gray-600"
          >
            Contemporary
          </Link>
          <Link
            to="/search/fiction/romance/fantasy"
            className="space-y-1 hover:text-gray-600"
          >
            Fantasy
          </Link>
          <Link
            to="/search/fiction/romance/historical"
            className="space-y-1 hover:text-gray-600"
          >
            Historical
          </Link>
          <Link
            to="/search/fiction/romance/comedy"
            className="space-y-1 hover:text-gray-600"
          >
            Comedy
          </Link>
          <Link
            to="/search/fiction/romance/suspense"
            className="space-y-1 hover:text-gray-600"
          >
            Suspense
          </Link>
          <Link
            to="/search/fiction/classics"
            className="text-lg font-semibold hover:text-gray-600"
          >
            Classics
          </Link>
          <Link
            to="/search/fiction/classics/american"
            className="space-y-1 hover:text-gray-600"
          >
            American
          </Link>
          <Link
            to="/search/fiction/classics/ancient"
            className="space-y-1 hover:text-gray-600"
          >
            Ancient
          </Link>
          <Link
            to="/search/fiction/classics/indian"
            className="space-y-1 hover:text-gray-600"
          >
            Indian
          </Link>
          <Link
            to="/search/fiction/classics/asian"
            className="space-y-1 hover:text-gray-600"
          >
            Asian
          </Link>
          <Link
            to="/search/fiction/classics/english-irish-scottish"
            className="space-y-1 hover:text-gray-600"
          >
            English, Irish & Scottish
          </Link>
          <Link
            to="/search/fiction/action-adventure"
            className="text-lg font-semibold hover:text-gray-600"
          >
            Action & Adventure
          </Link>
          <Link
            to="/search/fiction/action-adventure/historical"
            className="space-y-1 hover:text-gray-600"
          >
            Historical Adventure
          </Link>
        </div>
        <div className="flex flex-col gap-1.5">
          <Link
            to="/search/fiction/action-adventure/war-combat"
            className="space-y-1 hover:text-gray-600"
          >
            War & Combat
          </Link>
          <Link
            to="/search/fiction/crime-mystery-thrillers"
            className="text-lg font-semibold hover:text-gray-600"
          >
            Crime, Mystery & Thrillers
          </Link>
          <Link
            to="/search/fiction/crime-mystery-thrillers/mystery"
            className="space-y-1 hover:text-gray-600"
          >
            Mystery
          </Link>
          <Link
            to="/search/fiction/crime-mystery-thrillers/crime"
            className="space-y-1 hover:text-gray-600"
          >
            Crime
          </Link>
          <Link
            to="/search/fiction/crime-mystery-thrillers/thrillers-suspense"
            className="space-y-1 hover:text-gray-600"
          >
            Thrillers & Suspense
          </Link>
          <Link
            to="/search/fiction/science-fiction-fantasy"
            className="text-lg font-semibold hover:text-gray-600"
          >
            Science Fiction & Fantasy
          </Link>
          <Link
            to="/search/fiction/science-fiction-fantasy/science-fiction"
            className="space-y-1 hover:text-gray-600"
          >
            Science Fiction
          </Link>
          <Link
            to="/search/fiction/science-fiction-fantasy/fantasy"
            className="space-y-1 hover:text-gray-600"
          >
            Fantasy
          </Link>
          <Link
            to="/search/fiction/science-fiction-fantasy/horror"
            className="space-y-1 hover:text-gray-600"
          >
            Horror
          </Link>
          <Link
            to="/search/fiction/science-fiction-fantasy/dystopian"
            className="space-y-1 hover:text-gray-600"
          >
            Dystopian
          </Link>
          <Link
            to="/search/fiction/myths-legends-sagas"
            className="text-lg font-semibold hover:text-gray-600"
          >
            Myths, Legends & Sagas
          </Link>
          <Link
            to="/search/fiction/historical-fiction"
            className="text-lg font-semibold hover:text-gray-600"
          >
            Historical Fiction
          </Link>
          <Link
            to="/search/fiction/indian-writing"
            className="text-lg font-semibold hover:text-gray-600"
          >
            Indian Writing
          </Link>
          <Link
            to="/search/fiction/humour"
            className="text-lg font-semibold hover:text-gray-600"
          >
            Humour
          </Link>
        </div>
        <div className="flex flex-col gap-1.5">
          <Link
            to="/search/fiction/religious-spiritual-fiction"
            className="text-lg font-semibold hover:text-gray-600"
          >
            Religious & Spiritual Fiction
          </Link>
          <Link
            to="/search/fiction/short-stories"
            className="text-lg font-semibold hover:text-gray-600"
          >
            Short Stories
          </Link>
          <Link
            to="/search/fiction/novels-novellas"
            className="text-lg font-semibold hover:text-gray-600"
          >
            Novels & Novellas
          </Link>
          <Link
            to="/search/fiction/drama"
            className="text-lg font-semibold hover:text-gray-600"
          >
            Drama
          </Link>
          <Link
            to="/search/fiction/anthologies"
            className="text-lg font-semibold hover:text-gray-600"
          >
            Anthologies
          </Link>
          <Link
            to="/search/fiction/poetry"
            className="text-lg font-semibold hover:text-gray-600"
          >
            Poetry
          </Link>
        </div>
      </div>

      {/* Images (Last 2 columns) */}
      <div className="flex flex-row gap-5">
        {bookImages.map((image, index) => (
          <div>
            <img
              src={image}
              alt={`Book ${index + 1}`}
              className="w-fit h-96 object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fiction;
