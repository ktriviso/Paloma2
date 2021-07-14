import React from "react";

export const Poster = ({ item, i }) => (
  <div className="mx-auto" key={i}>
    <div className="w-52 m-5 border-2 border-black rounded-xl overflow-hidden bg-white flex flex-col items-center">
      <img
        src={item.images["Poster Art"].url}
        width={208}
        alt={`${item.title} Poster`}
      />
      <div className="p-5 truncate w-full text-center text-sm">
        {item.title}
      </div>
    </div>
  </div>
);
