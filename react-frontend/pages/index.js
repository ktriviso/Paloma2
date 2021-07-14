import React, { useEffect, useState } from "react";

import { Loader } from "../components/Loader/Loader";
import { Modal } from "../components/Modal/Modal";
import { Poster } from "../components/Poster/Poster";
import { Search } from "../components/Search/Search";
import axios from "axios";
import { useQuery } from "react-query";

// if i had more time...
// 1. handle isError from useQuery
// 2. move dropdown into its own component

export default function Home() {
  const [programType, setProgramType] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [allResults, setAllResults] = useState([]);
  const [showAllPosters, setShowAllPosters] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  const updateProgramType = async (e) => {
    const { value } = e.target;
    setProgramType(value);
    await passProgramType(value);
  };

  const fetchData = async (filter, inputValue) => {
    const { data } = await axios.get(
      `http://127.0.0.1:5000/api/${filter || "movies"}`,
      {
        params: {
          search: inputValue,
        },
      }
    );

    setShowError(data?.response === 404);
    return data?.entries;
  };

  const postData = async (value) => {
    const poster = await axios.post(`http://127.0.0.1:5000/api/new`, {
      params: value,
    });
    return poster?.data;
  };

  const { data, isLoading, isError } = useQuery(
    ["api", programType],
    async () => await fetchData(programType, searchValue)
  );

  const passSearchValue = async (inputValue) => {
    setSearchValue(inputValue);
    const data = await fetchData(programType, inputValue);

    if (data) {
      setSearchResults(data);
      setShowAllPosters(false);
    }
  };

  const clearSearch = () => {
    setSearchValue(null);
    setSearchResults([]);
    setShowError(false);
    setShowAllPosters(true);
  };

  const passProgramType = async (type) => {
    setProgramType(type);
    await fetchData(programType, searchValue);
  };

  const saveNewPoster = async (newPoster) => {
    const { response } = await postData(newPoster);
    if (response === 200) toggleModal();
  };

  const toggleModal = () => setShowModal((showModal) => !showModal);

  useEffect(() => {
    if (data?.length) {
      setAllResults(data);
    }
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <div className="relative">
      {showModal && (
        <Modal passPosterData={saveNewPoster} closeModal={toggleModal} />
      )}
      <header className="flex items-stretch justify-between p-4 flex-col md:flex-row">
        <Search passSearchValue={passSearchValue} clearSearch={clearSearch} />
        <div className="flex flex-col mt-4 md:flex-row md:mt-0">
          <button
            className="border-2 border-black p-4 mr-2 rounded-full text-white w-full bg-black hover:bg-white hover:text-black md:w-1/12 md:mt-0 min-w-130"
            onClick={toggleModal}
          >
            Add New
          </button>
          <select
            className="form-select w-full py-4 px-4 rounded-full mt-4 md:w-1/6 md:mt-0 min-w-130 cursor-pointer"
            value={programType || ""}
            onChange={updateProgramType}
          >
            <option value="movies">Movies</option>
            <option value="tv">Series</option>
          </select>
        </div>
      </header>
      <div className="flex flex-wrap bg-gray-200">
        {showError && (
          <div className="p-4">
            No titles found. Please try searching something else.
          </div>
        )}
        {showAllPosters && allResults?.length
          ? allResults?.map((item, i) => <Poster item={item} i={i} key={i} />)
          : null}
        {searchResults?.length
          ? searchResults?.map((item, i) => (
              <Poster item={item} i={i} key={i} />
            ))
          : null}
      </div>
    </div>
  );
}
