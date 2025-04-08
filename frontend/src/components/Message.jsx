import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scrollRef = useRef(null);
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  if (!authUser || !message) return null; // Prevent errors

  return (
    <div
      className={`chat ${authUser?._id === message?.senderId ? "chat-end" : "chat-start"}`}
      ref={scrollRef}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User avatar"
            src={
              message?.senderId === authUser?._id
                ? authUser?.profilePhoto || "/default-avatar.png"
                : selectedUser?.profilePhoto || "/default-avatar.png"
            }
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50">{message?.time || "N/A"}</time>
      </div>
      <div className="chat-bubble">{message?.message || "No message"}</div>
    </div>
  );
};

export default Message;
