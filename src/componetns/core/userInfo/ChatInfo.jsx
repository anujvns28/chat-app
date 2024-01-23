import React from 'react'
import { useSelector } from 'react-redux'
import { FaArrowLeft } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { MdBlock } from "react-icons/md";

const ChatInfo = ({ setChatInof }) => {
    const { chat } = useSelector((state) => state.chat);
    console.log(chat,"pringig chat")
    return (
        <div className='w-full h-full border border-black flex items-center justify-center transition-all '>
            {
                !chat ?
                    <p>loading...</p>
                    : <div className='w-full h-full flex flex-col bg-slate-700'>
                        <div className='w-full h-[70px] bg-slate-300 flex  items-end justify-start py-4 '>
                            <div className='flex flex-row gap-6 items-center justify-start  w-full pl-6 text-slate-100'>
                                <p onClick={() => setChatInof(false)}
                                    className='text-xl cursor-pointer'><FaArrowLeft /></p>
                                <p className='text-xl font-semibold'>Chat inoformation</p>
                            </div>
                        </div>

                        { /* image */}
                        <div className='flex items-center justify-center py-7 flex-col bg-slate-700 border border-black'>
                            <img
                                src={chat.isGroup ? chat.groupImg : chat.image}
                                className='w-[200px] h-[200px] rounded-full'
                            />
                            <p className='text-2xl font-semibold text-white'>{chat.isGroup ? chat.groupName : chat.name}</p>
                            <p className='text-xl text-white'>{chat.isGroup ? `Group : ${chat.members.length}` : chat.email}</p>
                        </div>

                        <div className='w-full mt-2  p-6 border border-black'>
                            <p className='text-green-300'>About</p>
                            <p className='text-xl text-white'>{!chat.isGroup ? chat.about ? chat.groupDesc : "You are not set About !!" : " Group adim set About !!"}</p>
                        </div>

                        {
                            chat.isGroup && 
                            <div className='w-full border border-black'>

                            </div>
                        }

                        <div className='w-full mt-2  border border-black '>
                            {
                                chat.isGroup ?
                                    <div className='cursor-pointer flex items-center justify-start  flex-row gap-4  hover:bg-slate-300 text-red-500 py-3 px-5'>
                                        <p className='text-xl font-semibold '>{<RxExit />}</p>
                                        <p className='text-lg'>Exit Group</p>
                                    </div>
                                    : <div className='cursor-pointer flex items-center justify-start  flex-row gap-4  hover:bg-slate-300 text-red-500 py-3 px-5'>
                                        <p className='text-xl font-semibold '>{<MdBlock />}</p>
                                        <p className='text-lg'>Block {chat.name}</p>
                                    </div>

                            }
                                    <div className='cursor-pointer flex items-center justify-start  flex-row gap-4  hover:bg-slate-300 text-red-500 py-3 px-5'>
                                        <p className='text-xl font-semibold '><MdDelete/></p>
                                        <p className='text-lg'>{chat.isGroup ? "Group" : chat.name}</p>
                                    </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ChatInfo
