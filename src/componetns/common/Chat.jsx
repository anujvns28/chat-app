import React, { useEffect, useState } from 'react'
import { IoVideocam } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from 'react-redux'
import SubmmitButton from './SubmmitButton';
import { fetchMsz, sendMsz } from '../../service/operations/chat';

const Chat = () => {
    const {chat} = useSelector((state) => state.chat);
    const {user} = useSelector((state) => state.user);
    const [time,setTime] = useState(true);
    const [msz,setMsz] = useState();
    const [chats,setChats] = useState();


    setTimeout(() => setTime(false),7000)
   
    const handleSubmit = async(e) => {
      e.preventDefault();
      const data = {
        msz:msz,
        chatId : chat._id,
        userId : user._id
      }
      const result = await sendMsz(data)
      if(result){
        console.log("sending msz ",result)
      }
    }
    
    const fetchChat = async() =>{
     if(chat){
      const data = {
        chatId : chat._id,
        userId : user._id
      }
      const result = await fetchMsz(data);
      if(result){
      console.log(result.data.chats,"fetched chats")
      setChats(result.data.chats)
      }
     }else{
      return
     }
    }

    useEffect(() =>{
    setTime(true)
    fetchChat()
    },[chat])
  return (
    <div className='w-full h-full'>
     {
        !chat ? <div className='h-full w-full flex items-center justify-center text-xl font-semibold'>You Have not Seleced any chat</div>
        :  <div className='w-[100%]  border h-full  border-black flex flex-col gap-1'>
        <div className='h-[80px] w-full mb-2 bg-slate-200 flex flex-row justify-between p-2'>
         <div className='flex flex-row gap-2'>
         <div>
         <img className='w-[50px] h-[50px] rounded-full'
         src={chat.image} />
         </div>
         <div className='flex flex-col gap-2  justify-center'>
         <p className=''>{chat.name}</p>
        {time &&  <p className='text-sm font-semibold'>click here for contact view</p>}
         </div>
         </div>

         <div className='flex flex-row gap-7 items-center justify-center text-xl px-3'>
            <p className='cursor-pointer'><IoVideocam/></p>
            <p className='cursor-pointer'><IoSearchSharp/></p>
            <p className='cursor-pointer'><BsThreeDotsVertical/></p>
         </div>
        </div>
         <div className='h-[88%] w-full  flex flex-col justify-between '>
        {/* chats */}
         <div className='w-full  h-[87%] overflow-auto  sticky top-3'>
          {
            !chats ? <div className='flex h-full items-center justify-center font-semibold text-xl'>
              <p>Say Hello!</p>
            </div>
            : <div className='flex flex-col gap-4'>
               {
                chats.map((item) => {
                  return <div className={`text-black px-10 w-full flex ${item.senderId == user._id ? "justify-end" : "justify-start" }`}>
                    
                    <p className={`${item.senderId == user._id ? "bg-green-500 w-fit text-black" : "bg-slate-500 w-fit items-center flex"}
                     p-2 rounded-md max-w-[40%] `}>
                      {item.msz}
                     </p>
                   
                  </div>
                })
               }
            </div> 
          }
         </div>

         {/* inputs */}
         <div className='h-[60px]  w-full  bg-slate-200 flex flex-row justify-between p-2'>
         <form onSubmit={handleSubmit}
         className='w-full flex flex-row gap-2'>
          <input 
          required
          onChange={(e) => setMsz(e.target.value)}
          className='w-[90%]  border border-black outline-none p-2 rounded-md text-xl '
          />
          <button>
            <SubmmitButton text={"Send"}/>
          </button>
         </form>
           </div>
         
         </div>
        </div> 
     }
    </div>
  )
}

export default Chat
