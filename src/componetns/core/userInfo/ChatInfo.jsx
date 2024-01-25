import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowLeft } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { MdBlock } from "react-icons/md";
import { fetchCommonGroup, fetchGroupInfo } from '../../../service/operations/group';
import UserInfo from './UserInfo';
import ChatUserInfo from './ChatUserInfo';
import { setCurrentChat } from '../../../slice/currentChat';
import { blockContact } from '../../../service/operations/user';
import Modal from '../../common/Modal';

const ChatInfo = ({ setChatInof }) => {
    const {user} = useSelector((state) => state.user);
    const { chat } = useSelector((state) => state.chat);
    const [groupInfo,setGroupInfo] = useState();
    const [userInfo,setUserInof] = useState();
    const [commonGroup,setCommonGroup] = useState();
    const [modalData,setModalData]  = useState();
    const dispatch = useDispatch();

    const fetchGroupInformation = async() => {
    const result = await fetchGroupInfo(chat._id);
    if(result){
        setGroupInfo(result.data)
    }
    }

    const handleCommonGroup = async() => {
        if(!chat.isGroup){
            const data = {
                userId : user._id,
                chatId : chat._id
            }
            const result = await fetchCommonGroup(data);
            if(result){
                setCommonGroup(result.data.data)
            }
        }
    }

    const handleClick = (data) => {
            setUserInof(data);
    }

    useEffect(() => {
        if(chat.isGroup){
            fetchGroupInformation();
        }
        handleCommonGroup();
    },[chat._id])
    
    const handleBlock = async() => {
        const data = {
            userId : user._id,
            chatId : chat._id
        }
        await blockContact(data)
        setModalData(null)
    }
    
    const handleBlockModal = async() => {
        const modal = {
            text1 : "User won't be able to message or call you anymore",
            text2 : chat.name,
            btn1 : "Cancel",
            btn2 : "Block",
            handler1 : () => setModalData(null),
            handler2 : () =>  handleBlock()
        }
        setModalData(modal);
    }






    
    return (
        <div className='w-full h-full border border-black flex items-center justify-center transition-all '>
            {
                !chat ?
                    <p>loading...</p>
                    : <div className={`${userInfo ? "w-[0px] " : "w-full"} h-full flex flex-col bg-slate-700 overflow-y-auto pb-10`}>
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
                       {/* common group */}
                        {
                         !chat.isGroup &&
                         <div>
                            {
                              commonGroup && 
                              <div>
                                <p className='px-4 py-2 text-white'>{commonGroup.length} group in common</p>
                                {
                                     commonGroup.map((group) => {
                                        return <div onClick={() => dispatch(setCurrentChat(group))}
                                        className='flex flex-row items-center justify-between py-2 cursor-pointer px-5 hover:bg-slate-500'>
                                          <div className='flex flex-row gap-3 items-center justify-start '>
                                          <img 
                                            src={group.groupImg}
                                            className='w-[50px] h-[50px] rounded-full'
                                          />
                                          <p className='text-xl text-white'>{group.groupName}</p>
                                          </div>                                  
                                        </div>
                                    })
                                }
                              </div>
                            }
                         </div>
                        }

                        {
                            chat.isGroup && 
                            <div className='w-full border border-black p-3 mt-3'>
                               {
                               groupInfo && 
                               groupInfo.data.members.map((member) => {
                                return <div onClick={() => handleClick(member)}
                                className='flex flex-row items-center justify-between py-2 cursor-pointer px-5 hover:bg-slate-500'>
                                  <div className='flex flex-row gap-3 items-center justify-start '>
                                  <img 
                                    src={member.image}
                                    className='w-[50px] h-[50px] rounded-full'
                                  />
                                  <p>{member.name}</p>
                                  </div>

                                 {
                                    chat.admin.includes(member._id) && 
                                    <div className='border border-black rounded-md p-1 text-xs text-white'>
                                    Group Admin
                                  </div>
                                 }
                                  
                                </div>
                            })
                               }
                            </div>
                        }

                        <div className='w-full mt-2  border border-black '>
                            {
                                chat.isGroup ?
                                    <div className='cursor-pointer flex items-center justify-start  flex-row gap-4  hover:bg-slate-300 text-red-500 py-3 px-5'>
                                        <p className='text-xl font-semibold '>{<RxExit />}</p>
                                        <p className='text-lg'>Exit Group</p>
                                    </div>
                                    : <div onClick={handleBlockModal}
                                    className='cursor-pointer flex items-center justify-start  flex-row gap-4  hover:bg-slate-300 text-red-500 py-3 px-5'>
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

            {
                userInfo && <ChatUserInfo setUserInof={setUserInof} userData={userInfo} setGroupInfo={setGroupInfo}/>
            }
            {
                modalData && <Modal modalData={modalData}/> 
            }
        </div>
    )
}

export default ChatInfo
