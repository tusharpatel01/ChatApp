import React, { useEffect } from 'react'
import axios from 'axios'

const useGetMessages = () => {
 useEffect(()=>{
    const fetchMessages = async() => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(`http://localhost:8000/api/v1/message/67d856024e60c58a2ee1a4ba`)
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    fetchMessages()

 },[])
}

export default useGetMessages