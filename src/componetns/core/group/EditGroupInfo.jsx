import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import SubmmitButton from '../../common/SubmmitButton'
import { useDispatch, useSelector } from 'react-redux'
import { changeGroupDesc, changeGroupName } from '../../../service/operations/group'
import { setCurrentChat } from '../../../slice/currentChat'

const EditGroupInfo = ({editGroupInfo,setEditGroupInfo,groupId,isUserLogin,}) => {
    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [formData,setFormData] = useState();
    
    const handleChange = (e) => {
     setFormData((prev) => ({
      ...prev,
      [e.target.name] : e.target.value
     }))   
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const data = {
            ...formData,
            userId: user._id,
            groupId: groupId,
        }
        if(editGroupInfo.inputName == "groupName"){
        const result = await changeGroupName(data);
            dispatch(setCurrentChat(result.data.data))
        }
        if(editGroupInfo.inputName == "groupDes"){
        const result = await changeGroupDesc(data);
        dispatch(setCurrentChat(result.data.data))
        }

        setEditGroupInfo(null);
       
        isUserLogin();
    }

    return (
        <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
            <div className='w-[60%] h-auto bg-slate-400 min-h-[60%]'>
                <div className='w-full h-[70px] bg-slate-300 flex  items-end justify-start py-4 '>
                    <div className='flex flex-row gap-6 items-center justify-start  w-full pl-6 text-slate-100'>
                        <p  onClick={() => setEditGroupInfo(null)}
                            className='text-xl cursor-pointer'><FaArrowLeft /></p>
                        <p className='text-xl font-semibold'>{editGroupInfo.text}</p>
                    </div>
                </div>

                <form >
                    <label>
                        <p>{editGroupInfo.placeHolder}</p>
                        <input
                        type={`${editGroupInfo.inputTpye}`}
                        name={editGroupInfo.inputName}
                        placeholder={editGroupInfo.placeHolder}
                        required
                        onChange={handleChange}
                        />
                    </label>
                    <button type='submit' onClick={handleSubmit}>
                        <SubmmitButton text={"edit"}/>
                    </button>
                </form>

            </div>
        </div>
    )
}

export default EditGroupInfo
