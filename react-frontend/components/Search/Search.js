import React, { useState } from "react";

// if i had more time...
// search while the user types instead of displaying results after enter

export const Search = ({ passSearchValue, clearSearch }) => {
  const [searchValue, setSearchValue] = useState(null);

  const updateInput = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleKeyDown = (e) => {
    const { key } = e;
    if (key === "Enter") passSearchValue(searchValue?.toLowerCase().trim());
  };

  const clearSearchValue = () => {
    setSearchValue(null);
    clearSearch();
  };

  return (
    <div className="w-full">
      <input
        type="text"
        className="form-input w-full py-4 px-4 rounded-full mr-1.5 md:w-3/6 md:mr-2.5"
        onChange={updateInput}
        value={searchValue || ""}
        placeholder="Search movies"
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={clearSearchValue}
        className="border-2 border-black py-4 px-4 mt-4 rounded-full text-white w-full bg-black hover:bg-white hover:text-black md:w-1/12 md:mt-0 min-w-130"
      >
        Clear
      </button>
    </div>
  );
};
