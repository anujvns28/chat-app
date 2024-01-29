import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { dismissUserGroupAdmin, existFromGroup, makeUserGroupAdmin } from '../../../service/operations/group';


const GroupMembers = ({ member, chat, setUserInof, fetchUserData ,fetchGroupInformation}) => {
    const { user } = useSelector((state) => state.user);
    const [openModal,setOpenModal] = useState(false);
    const modalRef = useRef();

    // opeing user info conainer
    const handleClick = (data) => {
        setUserInof(data);
    }

    const handleRemoveUser = async(userId) => { 
        await existFromGroup({userId:userId,groupId:chat._id});
        fetchUserData();
    }

    const handleMakeAdmin = async(userId) => {
        await makeUserGroupAdmin({userId:userId,groupId:chat._id});
        fetchGroupInformation();

    }

    const handleDismissAdmin = async(userId) => {
        await dismissUserGroupAdmin({userId:userId,groupId:chat._id});
        fetchUserData();
    }

    window.addEventListener("click", (e) => {
        if(e.target !== modalRef.current){
         setOpenModal(false);
        }else{
            return 
        }
    })

    return (
        <div className='flex relative flex-row items-center justify-between py-2 cursor-pointer px-5 hover:bg-slate-500'>
            <div onClick={() => handleClick(member)}
            className='flex flex-row gap-3 items-center justify-start '>
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

            {
                chat.admin.includes(user._id) &&
                <p className='relative'
                onClick={ () => setOpenModal(true)} ref={modalRef}>
                    <PiDotsThreeOutlineVerticalFill pointerEvents="none"/>
                </p>
            }

            {
                openModal && 
                <div className='absolute right-8 top-12 flex flex-col rounded-md p-3 z-50 bg-slate-400'>
                <div onClick={ () => handleRemoveUser(member._id)}
                className='p-2 rounded-md flex items-center hover:bg-slate-500'>Remove</div>
                {
                    chat.admin.includes(member._id) 
                    ? <div onClick={() => handleDismissAdmin(member._id)}
                    className='p-2 rounded-md flex items-center hover:bg-slate-500'>Dismiss as Admin</div>
                    : <div onClick={() => handleMakeAdmin(member._id)}
                    className='p-2 rounded-md flex items-center hover:bg-slate-500'>Make Admin</div>
                }

            </div>
            }

        </div>
    )
}

export default GroupMembers
