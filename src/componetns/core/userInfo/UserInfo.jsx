import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import GroupImg from '../group/GroupImg';
import EditUserProfileInof from './EditUserProfileInof';
import { MdEdit } from 'react-icons/md';

const UserInfo = ({ setUserInof, userData, isUserLogin }) => {
    const [editUserProfileImg, setEditUserProfileImg] = useState();
    const [editUserProfile, setEditUserProfile] = useState();
    
    const handleEditProfile = (text,type,placeHolder,inputName) => {
        const data = {
            text: text,
            inputType: type,
            placeHolder: placeHolder,
            inputName: inputName
        }

        setEditUserProfile(data);
    }

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
                            <img onClick={() => setEditUserProfileImg(true)}
                                src={userData.image}
                                className='w-[200px] h-[200px] rounded-full cursor-pointer'
                            />
                        </div>
                        {
                            editUserProfileImg && <GroupImg imgUrl={userData.image}
                                setEditProfileImg={setEditUserProfileImg}
                                isUserLogin={isUserLogin}
                            />
                        }
                        <div className='flex flex-col gap-4 px-4'>
                            <p className='text-green-300'>Your Name</p>
                          <div className='flex flex-row items-center gap-2'>
                          <p className='text-xl text-white'>{userData.name}</p>
                          <p onClick={() => handleEditProfile(
                                        "Edit User Name",
                                        "text",
                                        "Enter User name",
                                        "userName"
                                    )}
                            className='text-2xl font-semibold text-white cursor-pointer'><MdEdit />
                        </p>
                          </div>
                            <p className='text-white leading-tight'>This is not your username or pin . This user name visible to your contact</p>
                        </div>
                        <div className='flex flex-col gap-4 px-4 pt-8'>
                            <p className='text-green-300'>About</p>
                            <div className='flex flex-row items-center gap-2'>
                          <p className='text-xl text-white'>{userData.about ? userData.about : "You are not set About !!"}
                        </p>
                        <p onClick={() => handleEditProfile(
                                        "Edit User Description",
                                        "text",
                                        "Enter About",
                                        "about"
                                    )}
                        className='text-2xl font-semibold text-white cursor-pointer'><MdEdit/></p>
                          </div>
                            

                        </div>
                    </div>
            }
            {
                editUserProfile && 
                 <EditUserProfileInof 
                editUserProfile={editUserProfile}
                setEditUserProfile={setEditUserProfile}
                isUserLogin={isUserLogin}
                />
            }
        </div>
    )
}

export default UserInfo
