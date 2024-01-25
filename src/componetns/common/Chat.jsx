import React, { useEffect, useRef, useState } from 'react'
import { IoVideocam } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from 'react-redux'
import SubmmitButton from './SubmmitButton';
import { fetchGroupMsz, fetchOneToOneMsz, sendGroupMsz, sendOnetoOneMsz } from '../../service/operations/chat';
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiGrin } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import UserInfo from '../core/userInfo/UserInfo';
import ChatInfo from '../core/userInfo/ChatInfo';


const Chat = ({ socket }) => {
  const { chat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const [currentChat,setCurrentChat] = useState();
  const [time, setTime] = useState(true);
  const [msz, setMsz] = useState("");
  const [emoji, setEmoji] = useState('');
  const [chats, setChats] = useState();
  const [showEmoji, setShowemoji] = useState()
  const scrollRef = useRef();
  const [showMess, setshoMess] = useState(false);
  const [socketMess, setSocketMess] = useState();
  const [chatInfo, setChatInof] = useState(false);

  setTimeout(() => setTime(false), 7000)

  let groupMember
  if (chat) {
    if (chat.isGroup) {
      groupMember = [...chat.members]
      groupMember.push(chat._id)
    }
  }
  
  useEffect(() => {
    setCurrentChat(chat)
  },[chat])

  // send message
  const handleSubmit = async (e) => {
    e.preventDefault();
    // send msz => group
    if (chat.isGroup) {
      const data = {
        msz: msz,
        groupMem: groupMember,
        userId: user._id
      }
      await sendGroupMsz(data)
    }

    // send msz => one to one
    if (!chat.isGroup) {
      const data = {
        msz: msz,
        chatId: chat._id,
        userId: user._id
      }
      await sendOnetoOneMsz(data)
    }

    // socket 
    let socketGroupData
    if (chat.isGroup) {
      socketGroupData = {
        members: [...chat.members],
        groupId: chat._id
      }
    }
    const socketData = {
      msz: msz,
      chatId: chat.isGroup ? socketGroupData : chat._id,
      senderId: user._id
    }
    socket.emit("msz", socketData)

    setMsz("")
    setshoMess((prev) => !prev)
  }

  // fatchig chats
  const fetchChat = async () => {
    if (chat) {
      const data = {
        chat: !chat.isGroup ? chat._id : groupMember,
        userId: user._id
      }
      // group chat
      if (chat.isGroup) {
        const result = await fetchGroupMsz(data);
        if (result) {
          setChats(result.data.chats)
        }
      } else {
        const result = await fetchOneToOneMsz(data);
        if (result) {
          setChats(result.data.chats)
        }
      }
    }
  }

  useEffect(() => {
    setTime(true)
    fetchChat()
  }, [chat, showMess])

  if (chats) {
    socket.on("msg-recive", (data) => {
      setSocketMess(data);
      // console.log(data,"socket data")
    })
  }

  const fetchMszIo = () => {
    if (socketMess) {
      if (!chat.isGroup && socketMess.chatId.groupId === undefined) {
        if (socketMess.chatId === chat._id || socketMess.senderId === chat._id) {
          const messages = [...chats]
          messages.push(socketMess)
          setChats(messages)
        }
      } else {
        if (socketMess.chatId.groupId === chat._id) {
          const messages = [...chats]
          messages.push(socketMess)
          setChats(messages)
        }
      }
    }
  }

  useEffect(() => {
    fetchMszIo();
  }, [socketMess])



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
  }, [emoji])


  return (
    <div className='w-full h-full'>
      {
        !currentChat ? <div
          className='h-full w-full flex items-center justify-center text-xl font-semibold'>You Have not Seleced any chat</div>
          : <div className='w-full h-full flex '>
            <div className={`${chatInfo ? "w-[60%]" : "w-full"}  border h-full  border-black flex flex-col gap-1`}>
            <div onClick={() => setChatInof(true)}
            className='h-[70px] w-full mb-2 bg-slate-200 flex flex-row justify-between p-2 cursor-pointer'>
              <div className='flex flex-row gap-2'>
                <div>
                  <img className='w-[50px] h-[50px] rounded-full'
                    src={!currentChat.isGroup ? currentChat.image : currentChat.groupImg} />

                </div>
                <div className='flex flex-col gap-2  justify-center'>
                  <p className=''>{!currentChat.isGroup ? currentChat.name : currentChat.groupName}</p>
                  {time && <p className='text-sm font-semibold'>click here for contact view</p>}
                </div>

              </div>

              <div className='flex flex-row gap-7 items-center justify-center text-xl px-3'>
                <p className='cursor-pointer'><IoVideocam /></p>
                <p className='cursor-pointer'><IoSearchSharp /></p>
                <p className='cursor-pointer'><BsThreeDotsVertical /></p>
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
                            className={`scrollbar-h-* scrollbar  scrollbar-track-gray-100 text-black px-10 w-full flex ${item.senderId == user._id ? "justify-end" : "justify-start"}`}>
                            <p className={`${item.senderId === user._id ? "bg-green-500 w-fit text-black" : "bg-slate-500 w-fit items-center flex"}
                     p-2 rounded-md max-w-[40%]`}>
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
                        className='cursor-pointer'>{showEmoji ? <RxCross1 /> : <BsEmojiGrin />}</p>
                    </div >

                    <input
                      required
                      placeholder='Type a message'
                      onChange={(e) => setMsz(e.target.value)}
                      value={msz}
                      className='w-full  outline-none p-2 rounded-r-md text-xl  placeholder'
                    />
                  </div>
                  <button>
                    <SubmmitButton text={"Send"} />
                  </button>

                  <div
                    className={`${showEmoji ? "visible " : "invisible"} absolute -top-[480px] left-6`}>
                    <EmojiPicker onEmojiClick={handleEmoji} />
                  </div>
                </form>
              </div>

            </div>
          </div>

          {/* chat info */}
         {
           chatInfo && 
          <div className='w-[40%] h-full'>
           <ChatInfo setChatInof={setChatInof} />
          </div>
         }
          </div>  
      }
    </div>
  )
}

export default Chat
