import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSignupData } from '../slice/user';
import { useNavigate } from 'react-router-dom';
import { getOtp } from '../service/operations/auth';

const Signup = () => {
  const [formData,setFormData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleChange = (e) =>{
     setFormData((prev) =>({
      ...prev,
      [e.target.name] : e.target.value
     }))
    }

    const handleSubmit = async(e) =>{
      e.preventDefault();
  if(formData.password === formData.confirmPassword){
    dispatch(setSignupData(formData))
    getOtp(formData.email,navigate)
  }else{
    // genarate toast
    console.log("Password not matching")
  }
    }


  return (
    <div className='w-[50%]'>
    <form>
        {/* name */}
        <label className='w-full border border-black'>
            <p className='text-xl font-semibold'>Name</p>
            <input
            placeholder='Enter Name'
            required
            type='text'
            name= "name"
            onChange={handleChange}
            className='w-full  border border-black outline-none p-2 rounded-md text-xl '
            />
        </label>

         {/* email */}
         <label className='w-full'>
            <p className='text-xl font-semibold'>Email</p>
            <input
            placeholder='Enter Email'
            required
            type='email'
            name= "email"
            onChange={handleChange}
            className='w-full  border border-black outline-none p-2 rounded-md text-xl '
            />
        </label>

         {/* password*/}
         <label className='w-full'>
            <p className='text-xl font-semibold'>Password</p>
            <input
            placeholder='Enter Password'
            required
            type='text'
            name= "password"
            onChange={handleChange}
            className='w-full  border border-black outline-none p-2 rounded-md text-xl '
            />
        </label>

         {/* Confirm password */}
         <label className='w-full'>
            <p className='text-xl font-semibold'>Confirm Password</p>
            <input
            placeholder='Enter Confirm Password'
            required
            type='text'
            name= "confirmPassword"
            onChange={handleChange}
            className='w-full  border border-black outline-none p-2 rounded-md text-xl '
            />
        </label>

        <button onClick={handleSubmit}
        className='py-3 px-2 bg-yellow-400 border border-black rounded-md'>Send Otp</button>
    </form>
    </div>
  )
}

export default Signup
