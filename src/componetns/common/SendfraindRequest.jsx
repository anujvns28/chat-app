import React, { useState } from 'react'
import SubmmitButton from './SubmmitButton'
import { useSelector } from 'react-redux';
import { sendFraindRequest } from '../../service/operations/user';

const SendfraindRequest = () => {
    const [email,setEmail] = useState();
    const {user} = useSelector((state) => state.user);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const data = {
            email : email,
            userId : user._id
        }
        console.log(data,"data..")
        await sendFraindRequest(data)
    }
  return (
   <form onSubmit={handleSubmit}
   className='w-[25%] absolute bg-slate-400 border border-black p-4'>
    <label className='w-full border border-black'>
        <p>Enter email</p>
        <input
        name='email'
        type='text'
        required
        onChange={(e) => setEmail(e.target.value)}
         className='w-full  border border-black outline-none p-2 rounded-md text-xl '
        />
    </label>
   <button>
   <SubmmitButton text={"Send"}/>
   </button>
   </form>
  )
}

export default SendfraindRequest
