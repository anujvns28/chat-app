import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowLeft } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { MdBlock } from "react-icons/md";
import { existFromGroup, fetchCommonGroup, fetchGroupInfo } from '../../../service/operations/group';
import ChatUserInfo from './ChatUserInfo';
import { setCurrentChat } from '../../../slice/currentChat';
import { blockContact, deletContact, unblockContact } from '../../../service/operations/user';
import Modal from '../../common/Modal';
import { MdPersonAdd } from "react-icons/md";
import SelectUser from '../group/SelectUser';
import GroupMembers from '../group/GroupMembers';
import { MdEdit } from "react-icons/md";
import EditGroupInfo from '../group/EditGroupInfo';


const ChatInfo = ({
    setChatInof,
    userData,
    fetchUserData,
    setCurrentChat,
    isUserLogin
}) => {
    const { user } = useSelector((state) => state.user);
    const { chat } = useSelector((state) => state.chat);
    const [groupInfo, setGroupInfo] = useState();
    const [userInfo, setUserInof] = useState();
    const [commonGroup, setCommonGroup] = useState();
    const [modalData, setModalData] = useState();
    const [isYouBlocked, setIsYouBlocked] = useState(false);
    const [isBlockedByYou, setIsBlockedByYou] = useState(false);
    const [selectUser, setSelectUser] = useState(false);
    const [editGroupInfo,setEditGroupInfo] = useState(false);

    const dispatch = useDispatch();


    const checkBlockStatus = () => {
        setIsBlockedByYou(false);
        setIsYouBlocked(false)
        userData.block.map((user) => {
            if (user.user == chat._id && user.isYouBlock == true) {
                setIsYouBlocked(true)
            }
            else if (user.user == chat._id && user.isYouBlock == false) {
                setIsBlockedByYou(true)
            }
        })
    }

    const fetchGroupInformation = async () => {
        console.log("Calling....")
        const result = await fetchGroupInfo(chat._id);
        console.log(result,"this is group information")
        if (result) {
            setGroupInfo(result.data)
        }
    }

    const handleCommonGroup = async () => {
        if (!chat.isGroup) {
            const data = {
                userId: user._id,
                chatId: chat._id
            }
            const result = await fetchCommonGroup(data);
            if (result) {
                setCommonGroup(result.data.data)
            }
        }
    }
    

    // deleting user
    const handleDeleteUser = async () => {
        await deletContact({ userId: user._id, chatId: chat._id });
        setCurrentChat(null)
        isUserLogin();
        fetchUserData();
    }

    // exist group
    const handleExistGroup = async () => {
        await existFromGroup({ userId: user._id, groupId: chat._id });
        setCurrentChat(null);
        isUserLogin();
        fetchUserData();
    }

    // exist groupp modal
    const handleExistGroupModal = () => {
        const modal = {
            text1: "After existing you can not send or recive message",
            text2: chat.groupName,
            btn1: "Cancel",
            btn2: "Exist",
            handler1: () => setModalData(null),
            handler2: () => handleExistGroup()
        }
        setModalData(modal);
    }

    const handleDeletModal = () => {
        const modal = {
            text1: "Delet this user",
            text2: chat.name,
            btn1: "Cancel",
            btn2: "Delete",
            handler1: () => setModalData(null),
            handler2: () => handleDeleteUser()
        }
        setModalData(modal);
    }


    useEffect(() => {
        if (chat.isGroup) {
            fetchGroupInformation();
        }
        checkBlockStatus();
        handleCommonGroup();
    }, [chat._id, userData])

    const handleBlock = async () => {
        const data = {
            userId: user._id,
            chatId: chat._id
        }
        await blockContact(data)
        setModalData(null)
        setChatInof(null)
        fetchUserData();
    }

    const handleBlockModal = async () => {
        const modal = {
            text1: "User won't be able to message or call you anymore",
            text2: chat.name,
            btn1: "Cancel",
            btn2: "Block",
            handler1: () => setModalData(null),
            handler2: () => handleBlock()
        }
        setModalData(modal);
    }

    const handleUnblock = async () => {
        const data = {
            userId: user._id,
            chatId: chat._id
        }
        await unblockContact(data)
        setModalData(null)
        setChatInof(null)
        fetchUserData()
    }

    const handleUnBlockModal = async () => {
        const modal = {
            text1: "Unblock",
            text2: chat.name,
            btn1: "Cancel",
            btn2: "Unblock",
            handler1: () => setModalData(null),
            handler2: () => handleUnblock()
        }
        setModalData(modal);
    }

    //edit group info
    const handleEditGroupInfo = (text,type,placeHolder,inputName) => {
      const  data = {
            text : text,
            inputType: type,
            placeHolder:placeHolder,
            inputName : inputName
        }

        setEditGroupInfo(data);
    }

    useEffect(() => {
        checkBlockStatus()
    }, []);

    


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
                             <div className='flex flex-row gap-3 items-center'>
                             <p className='text-2xl font-semibold text-white'>{chat.isGroup ? chat.groupName : chat.name}</p>
                             <p onClick={() => handleEditGroupInfo(
                                "Edit Group Name",
                                "text"
                                ,"Enter Group Name",
                                "groupName"
                                )}
                             className='text-2xl font-semibold text-white cursor-pointer'><MdEdit/></p>
                             </div>
                            <p className='text-xl text-white'>{chat.isGroup ? `Group : ${chat.members.length}` : chat.email}</p>
                        </div>

                        <div className='w-full mt-2  p-6 border border-black'>
                            <p className='text-green-300'>About</p>
                            <div className='flex flex-row gap-3 items-center justify-between'>
                            <p className='text-xl text-white'>{!chat.isGroup ? chat.about ?  chat.about : "You are not set About !!"  : chat.isGroup ? chat.isGroup :  " Group adim set About !!"}</p>
                             <p onClick={() => handleEditGroupInfo(
                                "Edit Group Disprection",
                                "text",
                                "Enter Group Description",
                                "groupDes"
                                )}
                             className='text-2xl font-semibold text-white cursor-pointer'><MdEdit/></p>
                             </div>
                            
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

                                <div onClick={() => setSelectUser(true)}
                                    className='flex flex-row gap-3  items-center py-3 cursor-pointer px-5 hover:bg-slate-500'>
                                    <p className='text-xl rounded-full p-2 text-white bg-green-500'><MdPersonAdd /></p>
                                    <p className='text-white'>Add Member</p>
                                </div>
                                {
                                    groupInfo &&
                                    groupInfo.data.members.map((member) => {
                                        return <div>
                                            <GroupMembers 
                                             member={member} 
                                             chat={chat} 
                                             setUserInof={setUserInof} 
                                             fetchUserData={fetchUserData}
                                             groupInfo={groupInfo}
                                             />
                                        </div>
                                    })
                                }

                            </div>
                        }

                        <div className='w-full mt-2  border border-black '>
                            {
                                chat.isGroup ?
                                    <div onClick={handleExistGroupModal}
                                        className='cursor-pointer flex items-center justify-start  flex-row gap-4  hover:bg-slate-300 text-red-500 py-3 px-5'>
                                        <p className='text-xl font-semibold '>{<RxExit />}</p>
                                        <p className='text-lg'>Exit Group</p>
                                    </div>

                                    : <div>
                                        {
                                            isYouBlocked &&
                                            <div onClick={handleUnBlockModal}
                                                className='cursor-pointer flex items-center justify-start  flex-row gap-4  bg-green-400 hover:bg-green-500 text-red-500 py-3 px-5'>
                                                <p className='text-xl font-semibold '>{<MdBlock />}</p>
                                                <p className='text-lg'>UnBlock {chat.name}</p>
                                            </div>
                                        }

                                        {
                                            isBlockedByYou &&
                                            <div
                                                className=' flex items-center justify-start  flex-row gap-4 hover:bg-slate-300 text-red-500 py-3 px-5'>
                                                <p className='text-xl font-semibold '>{<MdBlock />}</p>
                                                <p className='text-lg'>You are blocked by user</p>
                                            </div>
                                        }

                                        {
                                            !isBlockedByYou && !isYouBlocked &&
                                            <div onClick={handleBlockModal}
                                                className='cursor-pointer flex items-center justify-start  flex-row gap-4 hover:bg-slate-300 text-red-500 py-3 px-5'>
                                                <p className='text-xl font-semibold '>{<MdBlock />}</p>
                                                <p className='text-lg'>Block {chat.name}</p>
                                            </div>
                                        }
                                    </div>

                            }
                            {
                                !chat.isGroup && <div onClick={handleDeletModal}
                                    className='cursor-pointer flex items-center justify-start  flex-row gap-4  hover:bg-slate-300 text-red-500 py-3 px-5'>
                                    <p className='text-xl font-semibold '><MdDelete /></p>
                                    <p className='text-lg'> {chat.name}</p>
                                </div>
                            }
                        </div>
                    </div>
            }

            {
                userInfo && <ChatUserInfo setUserInof={setUserInof} userData={userInfo} setGroupInfo={setGroupInfo} />
            }
            {
                modalData && <Modal modalData={modalData} />
            }
            {
                selectUser && <SelectUser setSelectUser={setSelectUser} groupInfo={groupInfo.data} fetchUserData={fetchUserData} />
            }
            {
            editGroupInfo && 
            <EditGroupInfo 
            editGroupInfo={editGroupInfo} 
            setEditGroupInfo={setEditGroupInfo} 
            groupId={chat._id} 
            isUserLogin={isUserLogin}
            
            />
            }
        </div>
    )
}

export default ChatInfo
