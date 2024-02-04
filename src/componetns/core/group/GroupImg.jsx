import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import SubmmitButton from '../../common/SubmmitButton'
import { changeGroupImg } from '../../../service/operations/group'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentChat } from '../../../slice/currentChat'
import { toast } from 'react-toastify'
import { changeUserImg } from '../../../service/operations/user'
import { setUser } from '../../../slice/user'

const GroupImg = ({ setEditProfileImg, imgUrl, isUserLogin, admins }) => {
    const { user } = useSelector((state) => state.user);
    const { chat } = useSelector((state) => state.chat);
    const dispatch = useDispatch();
    const [groupImg, setGroupImg] = useState();
    const [groupFile, setGroupFile] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(admins){
            const result = await changeGroupImg({ userId: user._id, groupId: chat._id, image: groupFile })
            dispatch(setCurrentChat(result.data.data))
        }else{
            const result = await changeUserImg({ userId: user._id,  image: groupFile })
            dispatch(setUser(result.data.data))
        }
        isUserLogin()
    }

    const handleChange = (e) => {
        const file = e.target.files[0];
        const image = URL.createObjectURL(file);
        setGroupImg(image)
        setGroupFile(file)
    }
    return (
        <div>
            <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
                <div className='w-[60%] h-auto bg-slate-400 min-h-[60%]'>
                    <div className='w-full h-[70px] bg-slate-300 flex  items-end justify-start py-4 '>
                        <div className='flex flex-row gap-6 items-center justify-start  w-full pl-6 text-slate-100'>
                            <p onClick={() => setEditProfileImg(false)}
                                className='text-xl cursor-pointer'><FaArrowLeft /></p>
                            <p className='text-xl font-semibold'>{admins ? "Viewing group image" : "Viewing Profile image"}</p>
                        </div>
                    </div>

                    <div>
                        <img
                            src={groupImg ? groupImg : imgUrl}
                            className='w-[200px] h-[200px] rounded-full'
                        />
                    </div>
                    {
                        admins &&
                        <div>
                            {
                                admins.includes(user._id) &&
                                <form >
                                    <label>
                                        <p className='text-2xl font-semibold text-white cursor-pointer'><MdEdit /></p>
                                        <input
                                            type='file'
                                            className='invisible'
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                    {
                                        groupFile &&
                                        <button type='submit' onClick={handleSubmit}>
                                            <SubmmitButton text={"Change"} />
                                        </button>
                                    }
                                </form>
                            }
                        </div>
                    }

                     {
                        !admins &&
                        <div>
                                <form >
                                    <label>
                                        <p className='text-2xl font-semibold text-white cursor-pointer'><MdEdit /></p>
                                        <input
                                            type='file'
                                            className='invisible'
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                    {
                                        groupFile &&
                                        <button type='submit' onClick={handleSubmit}>
                                            <SubmmitButton text={"Change"} />
                                        </button>
                                    }
                                </form>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default GroupImg
