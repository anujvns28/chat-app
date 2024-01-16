import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";

const SelectMember = ({setCreateGroup,contact}) => {
    const [members,setMembers] = useState([])
    //console.log(contact,"this are contacts")
    const imgContainer = [
     "https://api.multiavatar.com/Binx%487ond.svg",
     "https://api.multiavatar.com/Binx%457ond.svg",
     "https://api.multiavatar.com/Binx%467ond.svg",
     "https://api.multiavatar.com/Binx%486ond.svg",
     "https://api.multiavatar.com/Binx%497ond.svg",
     "https://api.multiavatar.com/Binx%483ond.svg",
     "https://api.multiavatar.com/Binx%467ond.svg",
     "https://api.multiavatar.com/Binx%687ond.svg",
     "https://api.multiavatar.com/Binx%887ond.svg",
     "https://api.multiavatar.com/Binx%483ond.svg",
     "https://api.multiavatar.com/Binx%467ond.svg",
     "https://api.multiavatar.com/Binx%687ond.svg",
     "https://api.multiavatar.com/Binx%887ond.svg"
    ]

    const handleMember = (img) => {
        console.log("calling")
      let mem = [...members]
      mem.push(img)
      setMembers(mem)
    }

    console.log("prinig memebers")
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
      
     <div className='border border-black w-[70%] h-[80%] bg-slate-200 rounded-md '>
     <div className='w-full flex items-center justify-between p-3 '>
     <p className='w-[60%] flex items-center justify-end text-2xl font-semibold'>Select group members</p>
     <p className='text-2xl font-semibold cursor-pointer w-fit'
      onClick={() => setCreateGroup(false)}><RxCross1/>
      </p>
     </div>

     <div className='w-full  justify-center items-center flex flex-col '>
      <p>Select</p>

     <div className='flex flex-wrap flex-row gap-3 w-[80%] items-center justify-center border border-red-500 '>
     {
        imgContainer.map((img) => {
            return <div>
                 <img onClick={() => handleMember(img)}
                 className='w-[70px] h-[70px] rounded-md cursor-pointer'
            src={img}/>
            </div>
        })
     }
     </div>
     </div>
      </div>
    </div>
  )
}

export default SelectMember
