import React, { useState } from 'react'
import SubmmitButton from '../componetns/common/SubmmitButton'
import { loginUser } from '../service/operations/auth';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [formData,setFormData] = useState();
  const dispatch = useDispatch();

  const handleChange = (e) =>{
   setFormData((prev) => ({
    ...prev,
    [e.target.name] : e.target.value
   }))
  }

  const handelSubmit = (e) => {
    e.preventDefault();
    loginUser(formData,dispatch)
  }
  return (
    <div className='felx items-center justify-center flex-col gap-2'>
      
     <form onSubmit={handelSubmit}>
     <label>
      <p className='text-xl font-semibold'>Enter Email</p>
      <input
      placeholder='Enter Email'
      type='email'
      required
      name='email'
      onChange={handleChange}
      />
     </label>

     <label>
      <p className='text-xl font-semibold'>Enter Password</p>
      <input
      placeholder='Enter password'
      type='string'
      required
      name='password'
      onChange={handleChange}
      />
     </label>
     <button>
     <SubmmitButton text={"Login"}/>
     </button>
     </form>
    </div>
  )
}

export default Login
