import SortDropdown from "./SortDropDown";

const HeaderSection = ({ label, sortParameters, changeSortParam }) => {
  return (
    <div className="flex flex-row items-center justify-center mt-16 pl-6">
      <div className="heading text-2xl mr-96 ml-80">
        <h1 className="font-semibold">
          {label
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
        </h1>
      </div>
      <div className="sortDropdown ml-56">
        <SortDropdown
          sortParameters={sortParameters}
          changeSortParam={changeSortParam}
        />
      </div>
    </div>
  );
};
export default HeaderSection;
