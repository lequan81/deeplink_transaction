import { useContext } from "react";
import { Context } from "../hooks/context";

function SearchBar() {
  const { handleSearch } = useContext(Context);
  return (
    <div className="w-full mx-auto px-4 mt-4">
      <div className="relative flex items-center w-full h-10 rounded-md focus-within:shadow-lg bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <div className="grid place-items-center h-full w-fit mx-2 text-gray-500 dark:text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          className="h-full w-full outline-none text-sm text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700"
          type="text"
          id="search"
          name="search"
          placeholder="Tìm kiếm ngân hàng..."
          onChange={handleSearch}
        />
      </div>
    </div>
  );
}

export default SearchBar;
