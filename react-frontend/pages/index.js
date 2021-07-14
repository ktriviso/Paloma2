import React, { useEffect, useState } from "react";

import { Loader } from "../components/Loader/Loader";
import { Poster } from "../components/Poster/Poster";
import axios from "axios";
import { useQuery } from "react-query";

// if i had more time...
// 1. handle isError from useQuery
// 2. move dropdown into its own component

export default function Home() {
  const [programType, setProgramType] = useState(null);
  const [allResults, setAllResults] = useState([]);

  const updateProgramType = async (e) => {
    const { value } = e.target;
    setProgramType(value);
    await passProgramType(value);
  };

  const fetchData = async (filter) => {
    const { data } = await axios.get(
      `http://127.0.0.1:5000/api/${filter || "movies"}`
    );
    return data?.entries;
  };

  const { data, isLoading, isError } = useQuery(
    ["api", programType],
    async () => await fetchData(programType)
  );

  const passProgramType = async (type) => {
    setProgramType(type);
    await fetchData(programType);
  };

  useEffect(() => {
    if (data?.length) {
      setAllResults(data);
    }
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <div className="relative">
      <header className="flex items-stretch justify-between p-4 flex-col md:flex-row">
        <div className="flex flex-col mt-4 md:flex-row md:mt-0">
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
        {allResults?.length
          ? allResults?.map((item, i) => <Poster item={item} i={i} key={i} />)
          : null}
      </div>
    </div>
  );
}
