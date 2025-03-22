import React from "react";
import { IoSend } from "react-icons/io5";

const Sendinput = () => {
  return (
    <form className="flex gap-2 p-2">
      <div className="w-full relative">
        <input type="text"
        className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none"
        placeholder="Type a message"
        />
        <button className="flex inset-y-0 end-0  items-center absolute  p-2 rounded-md"> 
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default Sendinput;
