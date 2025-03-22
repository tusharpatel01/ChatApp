import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
import toast from 'react-hot-toast'

function Signup() {
  const navigate=useNavigate()
  const [user , setUser]=useState({
    fullName:"",
    userName:"",
    password:"",
    confirmPassword:"",
    gender:"",
    email:"",
  })
  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    console.log(user);
    
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/users/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log(res);
      
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    
    console.log(user);
    setUser({
      fullName:"",
      userName:"",
      password:"",
      confirmPassword:"",
      gender:"",
      email:"",
    })
    
  }
  const handleGender=(gender)=>{
    setUser({...user,gender})

  }
  return (
    <div className='min-w-150 h-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-stone-500'>
        <h1 className='text-3xl font-bold text-center text-black '>
          Signup
        </h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black font-semibold'>Full Name</span>
            </label>
            <input type="text" 
            placeholder='John Doe' 
            value={user.fullName}
            onChange={(e)=>setUser({...user,fullName:e.target.value})}
            className='bg-gray-950 w-full input focus:outline-none focus:border-none focus:ring-0  h-10 rounded-xl' />
          </div>
          <div >
            <label className='label p-2'>
              <span  className='text-base label-text text-black font-semibold' >  email
              </span>
            </label>
            <input type="text" 
             value={user.email}
             onChange={(e)=>setUser({...user,email:e.target.value})}
              placeholder='email' 
              className='bg-gray-950 w-full input-bordered input h-10 rounded-xl focus:outline-none focus:border-none focus:ring-0' />
          </div>
          <div >
            <label className='label p-2'>
              <span  className='text-base label-text text-black font-semibold' >  UserName
              </span>
            </label>
            <input type="text" 
             value={user.userName}
             onChange={(e)=>setUser({...user,userName:e.target.value})}
              placeholder='username' 
              className='bg-gray-950 w-full input-bordered input h-10 rounded-xl focus:outline-none focus:border-none focus:ring-0' />
          </div>
          <div >
            <label className='label p-2'>
              <span  className='text-base label-text text-black font-semibold' >  password
              </span>
            </label>
            <input type="text"
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder='*********' 
            className='bg-gray-950 w-full input-bordered input h-10 rounded-xl focus:outline-none focus:border-none focus:ring-0' />
          </div>
          <div >
            <label className='label p-2'>
              <span  className='text-base label-text text-black font-semibold' > Confirm password
              </span>
            </label>
            <input type="text"
             placeholder='*********'
             value={user.confirmPassword}
             onChange={(e)=>setUser({...user,confirmPassword:e.target.value})}
             className=' bg-gray-950 w-full input-bordered input h-10 rounded-xl focus:outline-none focus:border-none focus:ring-0' />
          </div>
          <div className='flex items-center p-2 my-3 gap-4'>
          <div className='flex items-center'>
            <p className='text-black font-semibold'>male</p>
            <input type="checkbox" defaultChecked 
            className="checkbox" 
            value={user.gender} 
            checked={user.gender=="male"}
            onChange={()=>handleGender("male")}
            />
          </div>
          <div className='flex items-center'>
            <p className='text-black font-semibold'>female</p>
            <input type="checkbox" defaultChecked className="checkbox" value={user.gender}
             checked={user.gender=="female"}
             onChange={()=>handleGender("female")}
            />
          </div>
          </div>
          <div>
            <button type='submit' className='btn btn-block rounded-xl hover:border-white'>signup</button>
          </div>
          <div className='mt-2'>
          <Link to="/login">
          Already have a Account? <span className='text-blue-500'>login</span>
          </Link>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Signup