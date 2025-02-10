import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Dropdown from "./Dropdown";

const Filters = ({
  filters,
  selectedFilters,
  handleFilterChange,
  handleSliderChange,
  clearFilters,
}) => {
  return (
    <div className="flex gap-5 flex-col mr-4">
      <div className=" flex justify-between items-center">
        <h2 className="text-xl mb-2 ml-1">Filters</h2>
        <div className="pr-10">
          <button
            onClick={clearFilters}
            className="text-sm text-lilac_dark hover:text-lilac_dark px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Clear Filters
          </button>
        </div>
      </div>
      <div className="filters mr-10 mt-4">
        <Dropdown
          filterName="Authors"
          filterOptions={filters.authors}
          onFilterChange={(selectedAuthors) =>
            handleFilterChange("authors", selectedAuthors)
          }
        />
        <Dropdown
          filterName="Publishers"
          filterOptions={filters.publishers}
          onFilterChange={(selectedPublishers) =>
            handleFilterChange("publishers", selectedPublishers)
          }
        />
        <Dropdown
          filterName="Languages"
          filterOptions={filters.languages}
          onFilterChange={(selectedLanguages) =>
            handleFilterChange("languages", selectedLanguages)
          }
        />
        <div className="min-w-72 border rounded p-4 mb-2 w">
          <h3 className="font-semibold text-md mb-2">Price Range</h3>
          <Slider
            range
            step={100}
            min={0}
            max={2000}
            defaultValue={2000}
            onChange={(value) => handleSliderChange("priceRange", value)}
            trackStyle={{ backgroundColor: "#A294F9", height: 5 }}
            handleStyle={{
              borderColor: "#A294F9",
              backgroundColor: "#A294F9",
              height: 20,
              width: 20,
            }}
          />
          <div className="flex justify-between text-sm mt-2">
            <span>₹{selectedFilters.priceRange[0]}</span>
            <span>₹{selectedFilters.priceRange[1]}</span>
          </div>
        </div>
        <div className="min-w-72 border rounded p-4 mb-2 w">
          <h3 className="font-semibold text-md mb-2">Discount</h3>
          <Slider
            range
            step={5}
            min={0}
            max={100}
            defaultValue={0}
            onChange={(value) => handleSliderChange("discountRange", value)}
            trackStyle={{ backgroundColor: "#A294F9", height: 5 }}
            handleStyle={{
              borderColor: "#A294F9",
              backgroundColor: "#A294F9",
              height: 20,
              width: 20,
            }}
          />
          <div className="flex justify-between text-sm mt-2">
            <span>{selectedFilters.discountRange[0]}%</span>
            <span>{selectedFilters.discountRange[1]}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
