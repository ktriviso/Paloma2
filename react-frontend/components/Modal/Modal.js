import React, { useState } from "react";

// if i had more time...
// 1. use Joi or a similar schema language for validation
// 2. map schema values to dynamically display inputs
// 3. handle onchange a more dynamic way - see line 62
// 4. modal would accept child props instead of this hard coded form
// 5. have a semi-transparent backgroud to modal
// 6. add modal animation for open/close - fade in/out?
// 7. remove scroll when modal is open
// 8. add success text or alert when save is successful

export const Modal = ({ passPosterData, closeModal }) => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [programType, setProgramType] = useState(null);
  const [url, setUrl] = useState(null);
  const [releaseYear, setReleaseYear] = useState(null);

  const updateTitle = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  const updateDescription = (e) => {
    const { value } = e.target;
    setDescription(value);
  };

  const updateProgramType = (e) => {
    const { value } = e.target;
    setProgramType(value);
  };

  const updateUrl = (e) => {
    const { value } = e.target;
    setUrl(value);
  };

  const updateReleaseYear = (e) => {
    const { value } = e.target;
    setReleaseYear(value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const poster = formatPoster();
    // validation should go here
    // ex. is releaseYear a valid 4 digit year?
    passPosterData(poster);
  };

  const formatPoster = () => {
    return {
      title: title,
      description: description,
      programType: programType,
      images: {
        "Poster Art": {
          url: url,
          width: 1000,
          height: 1500,
        },
      },
      releaseYear: releaseYear,
    };
  };

  // const updateInput = (e) => {
  //   const type = e.target.getAttribute("data-type");
  //   const { value } = e.target;

  //   setPoster((poster) => ({
  //     ...poster,
  //     [type]: value,
  //   }));
  // };

  return (
    <div className="flex items-center content-center justify-center h-screen fixed w-full bg-gray-200">
      <form
        onSubmit={submitForm}
        className="flex items-center content-center justify-center flex-col bg-white p-8 w-5/12 max-w-screen-md rounded-lg"
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          onChange={updateTitle}
          value={title || ""}
          className="form-input px-4 py-3 rounded-full mb-2 border-2 border-black w-9/12"
        />
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          id="description"
          onChange={updateDescription}
          value={description || ""}
          className="form-input px-4 py-3 rounded-full mb-2 border-2 border-black w-9/12"
        />
        <label htmlFor="programType">Program Type</label>
        <input
          type="text"
          id="programType"
          onChange={updateProgramType}
          value={programType || ""}
          className="form-input px-4 py-3 rounded-full mb-2 border-2 border-black w-9/12"
        />
        <label htmlFor="url">Url</label>
        <input
          type="url"
          id="url"
          onChange={updateUrl}
          value={url || ""}
          className="form-input px-4 py-3 rounded-full mb-2 border-2 border-black w-9/12"
        />
        <label htmlFor="releaseYear">Release Year</label>
        <input
          type="number"
          id="releaseYear"
          onChange={updateReleaseYear}
          value={releaseYear || ""}
          className="form-input px-4 py-3 rounded-full mb-2 border-2 border-black w-9/12"
        />
        <div className="flex justify-between w-9/12 mt-4">
          <button
            type="submit"
            className="border-2 border-black py-4 px-4 mt-4 rounded-full text-white w-full bg-black hover:bg-white hover:text-black md:w-1/12 md:mt-0 min-w-130"
          >
            Save
          </button>
          <button
            onClick={closeModal}
            className="border-2 border-black py-4 px-4 mt-4 rounded-full hover:text-white w-full bg-black bg-white hover:bg-black text-black md:w-1/12 md:mt-0 min-w-130"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};
