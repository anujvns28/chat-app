import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiCommentAdd } from "react-icons/bi" ;
import { BsRecordCircle } from "react-icons/bs";
import { BsChatLeftDots } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import Contact from '../componetns/common/Contact';
import { fetchContact } from '../service/operations/user';


const Home = () => {
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.user);
  const {user} = useSelector((state) => state.user);
  const [userData,setUserData] = useState();
  const [contact,setContact] = useState();

  const links = [
    {
      icon : <BsChatLeftDots/>,
      link : "/"
    },
    {
      icon : <BsRecordCircle/>,
      link : "/"
    },
    {
      icon : <BiCommentAdd/>,
      link : "/"
    },
    {
      icon : <BsThreeDotsVertical/>,
      link : "/"
    },

  ]
  

  const isUserLogin = () => {
   if(!token){
    navigate("/login")
   }else{
    setUserData(user)
   }
  }

  const getContact = () => {
    const result = fetchContact(user._id)
    if(result){
      setContact(result)
    }
  }


  useEffect(() => {
    isUserLogin();
    getContact();
  },[])
  return (
    <div>
      {
        userData 
        ? <div className='flex w-screen h-screen border flex-row gap-1 border-black p-5'>
      <div className='w-[30%] border h-full border-black flex flex-col gap-1'>
      <div className='h-[115px] w-full  flex flex-col gap-1  '>
      <div className='h-[70px] w-full  bg-slate-30 flex justify-between bg-slate-200 px-4'>
        <div className=' w-[100px] h-full  flex items-center '>
        <img
        className='w-[50px] h-[50px] rounded-full'
         src={userData.image}
        />
        </div>
        <div className='flex flex-row gap-8 items-center justify-end w-[60%] text-xl '>
         {
          links.map((item) =>{
            return <div className='text-slate-700'>
              <Link to={item.link}>{item.icon}</Link>
            </div>
          })
         }
        </div>
      </div>
      <div className='h-[45px] w-full  px-3 flex flex-row py-1 '>
        
        <div  className='w-[10%] flex items-center bg-slate-200 rounded-l-md justify-center text-2xl text-black'> 
        <p><IoIosSearch/></p>

        </div>
       <div className='w-[80%]'>
       <input 
        className='w-full h-full rounded-r-md px-1 bg-slate-200 outline-none text-slate-700'
        placeholder='Serch or Start new Chat'
        />
       </div>
       <div className='w-[10%] flex items-center justify-center text-2xl text-black'>
        <p><IoFilterOutline/></p>
       </div>

      </div>
      </div>
      <div className='h-full w-full border border-green-500'>
        {
          contact && <div>
            {
          contact.map((contact) => {
            return <div>
              <Contact userData={contact}/>
            </div>
          })
        }
          </div>
        }
       
      </div>
     </div>

     <div className='w-[70%] border h-full  border-black flex flex-col gap-1'>
     <div className='h-[80px] w-full border bg-slate-3 00'></div>
      <div className='h-full w-full border border-green-500'>
      
      </div>
     </div>
     
     
     
    </div> 
        : <div>Loading...</div>
      }
    </div>
  )
}

export default Home
