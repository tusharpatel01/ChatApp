import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux"
import { setAuthUser } from "../redux/userSlice";

function Login() {
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    console.log(user);
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/users/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);

      if (res.data._id) {
        navigate("/");
        dispatch(setAuthUser(res.data))
        let username=res.data.fullName
        toast.success(`welcome ${username}`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      userName: "",
      password: "",
    });
  };

  return (
    <div className="min-w-150 h-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-stone-500">
        <h1 className="text-3xl font-bold text-center text-black ">Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black font-semibold">
                {" "}
                UserName
              </span>
            </label>
            <input
              type="text"
              placeholder="username"
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              className="bg-gray-950 w-full input-bordered input h-10 rounded-xl focus:outline-none focus:border-none focus:ring-0"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black font-semibold">
                {" "}
                password
              </span>
            </label>
            <input
              type="text"
              placeholder="*********"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="bg-gray-950 w-full input-bordered input h-10 rounded-xl focus:outline-none focus:border-none focus:ring-0"
            />
          </div>

          <div className="my-7">
            <button
              type="submit"
              className="btn btn-block rounded-xl hover:border-white"
            >
              Login
            </button>
          </div>
          <div className="mt-2 p-2">
            <Link to="/register">
              Don't have a Account?{" "}
              <span className="text-blue-500">signup</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
