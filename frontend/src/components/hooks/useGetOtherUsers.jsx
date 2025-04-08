import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          "http://localhost:8000/api/v1/users/getOtherUsers"
        );
        // const data = await response.json()
        // console.log(response.data)
        dispatch(setOtherUsers(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, []);
  return <div></div>;
};

export default useGetOtherUsers;
