import React, { useEffect } from 'react'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import { setMessages } from '../../redux/MessageSlice';

const useGetMessages = () => {
    const dispatch = useDispatch();
    const {selectedUser} = useSelector((store) => store?.user);
    // console.log(selectedUser._id);
    
 useEffect(()=>{
    const fetchMessages = async() => {
        if (!selectedUser?._id) return; 
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get(`http://localhost:8000/api/v1/message/${selectedUser._id}`)
            // const data = await response.json()
          
            // console.log("response is",res.data);
            dispatch(setMessages(res.data));
            // console.log("not working");
            
        } catch (error) {
            console.log(error)
            console.log("inside error");
            
        }
    }
    fetchMessages();

 },[selectedUser._id,setMessages])
}

export default useGetMessages