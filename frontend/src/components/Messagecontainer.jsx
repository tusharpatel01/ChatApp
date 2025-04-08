import React, { useEffect } from "react";
import Sendinput from "./Sendinput";
import Showmessages from "./Showmessages";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice.js";

function Messagecontainer() {
  const { selectedUser,authUser } = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedUser !== null) {
      return()=>dispatch(setSelectedUser(null));
    }
  }, []);

  return (
    <>
      {selectedUser !== null ? (
        <div className="md:min-w-[550px] flex flex-col">
          <div className="bg-gray-600 px-2 py-3 mb-2 flex gap-3 items-center rounded-md p-2 cursor-pointer">
            <div className="avatar online">
              <div className="w-10 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="Profile" />
              </div>
            </div>

            <div className=" flex  flex-col flex-1">
              <div className=" justify-between  flex gap-2 ">
                <p>{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>

          <Showmessages />
          <Sendinput />
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center gap-3">
          <p className="text-black font-bold text-3xl">Hii , {authUser?.fullName}</p>
          <h1 className="text-2xl">let`s start Bantering</h1>
        </div>
      )}
    </>
  );
}

export default Messagecontainer;
