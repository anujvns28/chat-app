import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'

const Status = ({setStatus,setAnuj}) => {
    const [userData,setUserData] = useState();
    
    const handleStatus = () =>{
        setAnuj(false)
        setStatus(false)
    }
  return (
    <div className='w-full h-full border border-black flex items-center justify-center transition-all '>
            {
                // !userData ?
                //     <p>loading...</p>
                     <div className='w-full h-full bg-slate-700'>
                        <div className='w-full h-[110px] bg-slate-400 flex  items-end justify-start py-4 '>
                            <div className='flex flex-row gap-6 items-center justify-start  w-full pl-6 text-slate-100'>
                                <p onClick={handleStatus}
                                    className='text-xl cursor-pointer'><FaArrowLeft /></p>
                                <p className='text-xl font-semibold'>Profile</p>
                            </div>
                        </div>
                       
                    </div>
            }
           
        </div>
  )
}

export default Status
