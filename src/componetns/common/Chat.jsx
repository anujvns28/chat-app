import React, { useEffect, useRef, useState } from 'react'
import { IoVideocam } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from 'react-redux'
import SubmmitButton from './SubmmitButton';
import { fetchMsz, sendMsz } from '../../service/operations/chat';
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiGrin } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";


const Chat = ({socket}) => {
    const {chat} = useSelector((state) => state.chat);
    const {user} = useSelector((state) => state.user);
    const [time,setTime] = useState(true);
    const [msz,setMsz] = useState("");
    const [emoji,setEmoji] = useState('');
    const [chats,setChats] = useState();
    const [showEmoji,setShowemoji] = useState()
    const scrollRef = useRef();

    setTimeout(() => setTime(false),7000)
    let groupIds
    if(chat){
       if(chat.isGroup){
        groupIds = [...chat.members]
        groupIds.push(chat._id)
       }
    }
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      const data = {
        msz:msz,
        chat : !chat.isGroup ? chat._id : groupIds,
        userId : user._id
      }
      const result = await sendMsz(data)
      
      // const socketData = {
      //   msz:msz,
      //   chatId : chat._id,
      //   senderId : user._id
      // }
      // socket.emit("msz",socketData)


      const socketData = {
        msz:msz,
        chatId : chat.isGroup ? [...chat.members] : chat._id,
        senderId : user._id
      }
      socket.emit("msz",socketData)

       setMsz("")
    }
    
    const fetchChat = async() =>{
     if(chat){
      
      const data = {
        chat : !chat.isGroup ? chat._id : groupIds,
        userId : user._id
      }
      const result = await fetchMsz(data);
      if(result){
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



   useEffect(() => {
    
      if(chats){
        socket.on("msg-recive",(data) => {
          const messages = [...chats]
          messages.push(data)
          setChats(messages)
        })
      }
    
   },[chats])
 
   
   const handleEmoji = (event) => {
   setEmoji(event.emoji)
   }


   useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  useEffect(() => {
   let message = msz
   message = message + emoji
   setMsz(message)
  },[emoji])

//console.log(chat,"pringitn chat")
  return (
    <div className='w-full h-full'>
     {
        !chat ? <div 
        className='h-full w-full flex items-center justify-center text-xl font-semibold'>You Have not Seleced any chat</div>
        :  <div className='w-[100%]  border h-full  border-black flex flex-col gap-1'>
        <div className='h-[80px] w-full mb-2 bg-slate-200 flex flex-row justify-between p-2'>
         <div className='flex flex-row gap-2'>
         <div>
         <img className='w-[50px] h-[50px] rounded-full'
         src={!chat.isGroup  ? chat.image : chat.groupImg} />
         
         </div>
         <div className='flex flex-col gap-2  justify-center'>
         <p className=''>{!chat.isGroup  ? chat.name : chat.groupName}</p>
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
              <p>loading...</p>
            </div>
            : <div className='flex flex-col gap-4'>
               {
                chats.map((item) => {
                  return <div ref={scrollRef}
                  className={`scrollbar-h-* scrollbar  scrollbar-track-gray-100 text-black px-10 w-full flex ${item.senderId == user._id ? "justify-end" : "justify-start" }`}>
                    
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
         className='w-full flex flex-row gap-2 relative'>
          <div className='flex w-full border border-black rounded-md'>

          <div className='flex h-full items-center justify-center text-2xl
           font-semibold px-3 rounded-l-md bg-white'>
            <p onClick={() => setShowemoji(!showEmoji)}
            className='cursor-pointer'>{showEmoji ? <RxCross1/> : <BsEmojiGrin/>}</p>
          </div>

          <input 
          required
          placeholder='Type a message'
          onChange={(e) => setMsz(e.target.value)}
          value={msz}
          className='w-full  outline-none p-2 rounded-r-md text-xl  placeholder'
          />
          </div>
          <button>
            <SubmmitButton  text={"Send"}/>
          </button>

          <div
          className={`${showEmoji ? "visible " : "invisible"} absolute -top-[480px] left-6`}>
          <EmojiPicker onEmojiClick={handleEmoji}/>
          </div>
         </form>
           </div>
         
         </div>
        </div> 
     }
    </div>
  )
}

export default Chat
