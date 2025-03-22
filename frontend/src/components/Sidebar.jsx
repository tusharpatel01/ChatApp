import React from "react";
import { MdPersonSearch } from "react-icons/md";
import Otherusers from "./Otherusers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const logOutHandler = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/users/logout");
      console.log(res);
      if (res.data?.message) {
        toast.success(res.data.message);
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
      <form action="">
        <div className="flex gap-2">
          <input
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
