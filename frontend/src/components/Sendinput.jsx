import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessages } from "../redux/MessageSlice.js";

const Sendinput = () => {
  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();

  const SubmitHandler = async (e) => {
    e.preventDefault();

    // Check if the user is selected and the message is not empty
    if (!selectedUser || !selectedUser._id) {
      console.error("No user selected");
      return;
    }
    if (!message.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/message/send/${selectedUser._id}`,
        { message },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch(setMessages([...messages, res.data.newMessage]));
      setMessage("");
    } catch (error) {
      console.error("Message sending error:", error);
    }
  };

  return (
    <form onSubmit={SubmitHandler} className="flex gap-2 p-2">
      <div className="w-full relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none pr-10"
          placeholder="Type a message"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-md text-gray-500 hover:text-blue-500"
          disabled={!message.trim()}
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default Sendinput;
