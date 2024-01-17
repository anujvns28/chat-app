import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSignupData } from '../slice/user';
import { useNavigate } from 'react-router-dom';
import { getOtp } from '../service/operations/auth';
import { toast } from 'react-toastify';
import SubmmitButton from '../componetns/common/SubmmitButton';
import SelectImage from '../componetns/common/SelectImage';

const Signup = () => {
  const [formData,setFormData] = useState();
  const [step,setStep] = useState(1);
  const { signupData } = useSelector((state) => state.user);
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
    setStep(2)
  }else{
    // genarate toast
    toast.error("Password not matching")
  }
  }

  const getImgUrl = (url) => {
    if(url){
      const data = {
      ...signupData,
      image : url
    }
    dispatch(setSignupData(data))
    getOtp(formData.email,navigate);
    navigate("/verfyEmail")
    }else {
      toast.error("Error in Creating user")
      navigate("/signup")
    }
  }


  return (
    <div className='w-[50%]'>
    {
      step == 1 &&
      <form onSubmit={handleSubmit}>
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

       <button >
       <SubmmitButton text={"Next"}/>
       </button>
    </form>
}

{/* step 2 select image */}
<div className='w-screen h-screen flex items-center justify-center border border-black'>
{
      step == 2 &&
      <div className='w-[70%] '>
        <SelectImage text={"Get Otp"}  getImgUrl={getImgUrl}/>
      </div>
    }
</div>
    
    </div>
  )
}

export default Signup
