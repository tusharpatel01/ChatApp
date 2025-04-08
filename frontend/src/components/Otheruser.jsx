import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const Otheruser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers?.includes(user?._id);
  // const user=props.user
  const SelectedUserHandler = (user) => {
    // console.log(user);
    dispatch(setSelectedUser(user));
  };

  return (
    <div onClick={() => SelectedUserHandler(user)} className="p-1 ">
      <div
        className={` ${
          selectedUser?._id === user?._id ? "bg-zinc-600" : ""
        } flex gap-3 items-center hover:bg-zinc-500 rounded-md p-2 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "bg-green-500" : "bg-gray-500"}`}>
          <div className="w-10 rounded-full">
            <img src={user?.profilePhoto} alt="Profile" />
          </div>
        </div>

        <div className=" flex  flex-col flex-1">
          <div className=" justify-between  flex gap-2 ">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otheruser;
