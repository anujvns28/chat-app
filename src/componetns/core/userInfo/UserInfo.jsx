import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";

const UserInfo = ({ setUserInof, userData }) => {

    return (
        <div className='w-full h-full border border-black flex items-center justify-center transition-all '>
            {
                !userData ?
                    <p>loading...</p>
                    : <div className='w-full h-full bg-slate-700'>
                        <div className='w-full h-[110px] bg-slate-400 flex  items-end justify-start py-4 '>
                            <div className='flex flex-row gap-6 items-center justify-start  w-full pl-6 text-slate-100'>
                                <p onClick={() => setUserInof(false)}
                                    className='text-xl cursor-pointer'><FaArrowLeft /></p>
                                <p className='text-xl font-semibold'>Profile</p>
                            </div>
                        </div>
                        {/* image */}
                        <div className='flex items-center justify-center py-7'>
                            <img
                                src={userData.image}
                                className='w-[200px] h-[200px] rounded-full'
                            />
                        </div>
                        <div className='flex flex-col gap-4 px-4'>
                            <p className='text-green-300'>Your Name</p>
                            <p className='text-xl text-white'>{userData.name}</p>
                            <p className='text-white leading-tight'>This is not your username or pin . This user name visible to your contact</p>
                        </div>
                        <div className='flex flex-col gap-4 px-4 pt-8'>
                            <p className='text-green-300'>About</p>
                            <p className='text-xl text-white'>{userData.about ? userData.about : "You are not set About !!"}</p>
                            
                        </div>
                    </div>
            }
        </div>
    )
}

export default UserInfo
