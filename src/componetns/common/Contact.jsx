import React from 'react'

const Contact = ({userData}) => {
    console.log(userData,"printing user data form contact")
  return (
    <div className='border border-black w-full flex flex-row justify-between p-2'>
      <div className='flex flex-row gap-3'>
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
