import React from "react";
import { useSelector } from "react-redux";
import useGetOtherUsers from "./hooks/useGetOtherUsers.jsx";
import Otheruser from "./Otheruser.jsx";

const Otherusers = () => {
  useGetOtherUsers();
  const {otherUsers} = useSelector((store) => store?.user);
  if (otherUsers === null) {
    return <div>Loading...</div>;
  }
  return (
    <div className="overflow-auto flex-1">
      {
      otherUsers?.map((user) => (
        <Otheruser key={user._id} user={user} />
      ))
      }
    </div>
  );
};

export default Otherusers;
