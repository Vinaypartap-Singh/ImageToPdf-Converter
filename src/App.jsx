import React from "react";
import Converter from "./components/Converter";

export default function App() {
  const navItems = [
    {
      title: "Home",
    },
    {
      title: "Services",
    },
  ];
  return (
    <div className="max-w-7xl m-auto pb-24 px-10">
      <div className="flex flex-col md:flex-row py-8 items-center justify-between">
        <h5 className="text-xl font-bold">Vinay's PDF</h5>
        <div>
          <ul className="flex gap-10 items-center">
            {navItems.map((data, index) => {
              return (
                <li
                  key={index}
                  className="hover:underline hover:text-red-500 cursor-pointer"
                >
                  {data.title}
                </li>
              );
            })}
            <button className="bg-violet-600 hover:bg-violet-800 px-8 py-2 rounded text-white">
              Contact
            </button>
          </ul>
        </div>
      </div>
      <Converter />
    </div>
  );
}
