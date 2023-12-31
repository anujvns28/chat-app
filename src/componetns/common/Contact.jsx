import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setCurrentChat } from '../../slice/currentChat';

const Contact = ({userData}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    
  return (
    <div  onClick={() => dispatch(setCurrentChat(userData))}
    className='border border-black w-full flex flex-row justify-between p-2 cursor-pointer'>
      <div
      className='flex flex-row gap-3 '>
      <div>
        <img className='w-[50px] h-[50px] rounded-full'
        src={userData.image} />
      </div>
      <div className='flex flex-col gap-1 pt-y'>
          <p>{userData.name}</p>
          <p>hii</p>
      </div>
      </div>
      <div></div>
    </div>
  )
}

export default Contact
