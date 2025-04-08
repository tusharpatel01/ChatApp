import React, { useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
// import { setOtherUsers } from "../redux/userSlice";
import Otherusers from "./Otherusers.jsx";
import { setAuthUser, setOtherUsers } from "../redux/userSlice";

function Sidebar() {
  const {otherUsers} =useSelector((store)=>store.user)
  const dispatch=useDispatch()

  const [input, setInput] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    console.log(input);

    const conversationUser=otherUsers.find((user)=>user.fullName.toLowerCase().includes(input.toLowerCase()))
    console.log(conversationUser);
    
    if(conversationUser){
      dispatch(setOtherUsers([conversationUser]))
    }
    else{
      toast.error("User not found")
    }
  };

  const navigate = useNavigate();
  const logOutHandler = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/users/logout");
      console.log(res);
      if (res.data?.message) {
        toast.success(res.data.message);
        dispatch(setAuthUser(null));
      } else {
        toast.success("Logged out successfully!");
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form onSubmit={searchHandler}>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="input input-bordered rounded-md "
            placeholder="search..."
          />
          <button
            type="submit"
            className=" rounded-xl btn bg-zinc-700 text-white"
          >
            <MdPersonSearch className="w-6 h-6 outline-none" />
          </button>
        </div>
      </form>
      <div className="divider px-3"></div>
      <Otherusers />

      <div className="mt-2">
        <button onClick={logOutHandler} className="btn btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
