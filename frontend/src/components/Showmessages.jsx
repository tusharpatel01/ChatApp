import React from "react";
import Message from "./Message";
import useGetMessages from "./hooks/useGetMessages.jsx";
import { useSelector } from "react-redux";
import useGetRealtimeMessages from "./hooks/useGetRealtimeMessages.jsx";

const Showmessages = () => {
  useGetMessages();
  useGetRealtimeMessages();
  const { messages } = useSelector((store) => store.message);
  if (!messages) return;

  return (
    <div className="px-4 py-2 flex-1 overflow-auto scroll-auto scroll-smooth">
      {messages &&
        messages.map((message) => {
          return <Message key={message._id} message={message} />;
        })}
    </div>
  );
};

export default Showmessages;
