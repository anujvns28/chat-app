import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiCommentAdd } from "react-icons/bi";
import { BsRecordCircle } from "react-icons/bs";
import { BsChatLeftDots } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import Contact from '../componetns/common/Contact';
import { fetchContact, fetchUserInformaion } from '../service/operations/user';
import SendfraindRequest from '../componetns/common/SendfraindRequest';
import Chat from '../componetns/common/Chat';
import io from "socket.io-client"
import CreateGroup from '../componetns/core/group/CreateGroup';
import { fetchGroups } from '../service/operations/group';
import UserInfo from '../componetns/core/userInfo/UserInfo';
import AllUsers from '../componetns/common/AllUsers';
import Request from '../componetns/core/UserFeture/Request';
import Status from '../componetns/core/UserFeture/Status';



const socket = io("http://localhost:3000");

const Home = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const { chat } = useSelector((state) => state.chat);
  const [userData, setUserData] = useState();
  const [contact, setContact] = useState();
  const [group, setGroup] = useState();
  const [fraindRequest, setFraindRequest] = useState(false);
  const [otherFeautre, setOutherFeture] = useState(false);
  const [createGroup, setCreateGroup] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [userInfo, setUserInof] = useState(false);
  const [allUser,setAllUser] = useState(false);
  const [requests,setRequests] = useState(false);
  const [status,setStatus] = useState(false);
  const [anuj,setAnuj] = useState(false);
  const otherFetureRef = useRef();

  console.log("anujji")
  
  const isUserLogin = async () => {
    if (!token) {
      navigate("/login")
    } else {
      const result = await fetchContact(user._id);
      const groupResult = await fetchGroups(user._id);
      const userInformation = await fetchUserInformaion(user._id);
      if(userInformation){
        setUserData(userInformation.data.data)
      }
      if (result) {
        setContact(result.data.data)
      }
      if (groupResult) {
        setGroup(groupResult.data.data)
      }

    }
  }

  window.addEventListener("click", (e) => {
    if (otherFetureRef.current == e.target) {
      return
    } else {
      setOutherFeture(false)
    }

  })


  useEffect(() => {
    isUserLogin();

  }, [])

  useEffect(() => {
  console.log("chanigilljjk")
    if (user) {
      socket.emit("add-user", {
        userId: user._id,
        userName: user.email
      })

    } else {
      return
    }
  }, [])

  const handleWhatIsVisible = (data) => {
    setAnuj(true)
    if(data == "status"){
      setStatus(true)
    }else {
      setUserInof(true)
    }
  }

  
  return (
    <div className='h-full w-full overflow-y-hidden'>
      {
        userData
          ? <div className='flex w-screen h-screen  flex-row gap-1  p-2'>
            {
             !anuj  ?
                <div className='w-[30%] min-w-[340px] border h-full border-black flex flex-col gap-1'>
                  <div className='h-[115px] w-full  flex flex-col gap-1  '>
                    <div className='h-[70px] w-full  bg-slate-30 flex justify-between bg-slate-200 px-4 '>
                      <div className=' w-[100px] h-full  flex items-center '>
                        <img
                          className='w-[50px] h-[50px] rounded-full cursor-pointer'
                          src={userData.image}
                          onClick={() => handleWhatIsVisible("userInfo")}
                        />
                      </div>
                      <div className='flex  flex-row gap-8 items-center justify-end w-[60%] text-xl '>
                        <p onClick={() => setRequests(true)}
                        className='cursor-pointer'><BsChatLeftDots /></p>
                        <p onClick={() => handleWhatIsVisible("status")}
                        className='cursor-pointer'><BsRecordCircle /></p>
                        <p
                          onClick={() => setFraindRequest(!fraindRequest)}
                          className='cursor-pointer'><BiCommentAdd /></p>
                        <div
                          onClick={() => setOutherFeture(!otherFeautre)}
                          className='cursor-pointer relative'>
                          <p
                            ref={otherFetureRef}
                            className={`p-2 rounded-full ${otherFeautre ? "bg-slate-300" : ""}`}><BsThreeDotsVertical pointerEvents="none" />
                          </p>
                          {
                            otherFeautre &&
                            <div className='w-[210px] flex flex-col gap-2 p-4 bg-slate-400 rounded-md text-base 
                                absolute right-3 top-10 '>
                              <p onClick={() => setCreateGroup(true)}
                                className='cursor-pointer hover:bg-slate-500 p-1 rounded-md'>New group</p>
                              <p onClick={() => setAllUser(true)}
                              className='cursor-pointer hover:bg-slate-500 p-1 rounded-md'>All users</p>
                              <p className='cursor-pointer hover:bg-slate-500 p-1 rounded-md'>Settings</p>
                              <p className='cursor-pointer hover:bg-slate-500 p-1 rounded-md'>Log out</p>
                            </div>
                          }
                        </div>
                      </div>

                    </div>
                    <div className='h-[45px] w-full  px-3 flex flex-row py-1 '>

                      <div className='w-[10%] flex items-center bg-slate-200 rounded-l-md justify-center text-2xl text-black'>
                        <p><IoIosSearch /></p>

                      </div>
                      <div className='w-[80%]'>
                        <input
                          className='w-full h-full rounded-r-md px-1 bg-slate-200 outline-none text-slate-700'
                          placeholder='Serch or Start new Chat'
                        />
                      </div>
                      <div className='w-[10%] flex items-center justify-center text-2xl text-black'>
                        <p><IoFilterOutline /></p>
                      </div>
                    </div>
                  </div>

                  <div className='flex w-full items-center justify-between  px-12 py-1 '>
                    <p onClick={() => setIsGroup(false)}
                      className={`px-2 py-1 cursor-pointer rounmd border border-black rounded-md ${!isGroup ? "bg-yellow-400" : ""}`}>Contact</p>
                    <p onClick={() => setIsGroup(true)}
                      className={`px-2 py-1 cursor-pointer rounmd border border-black rounded-md ${isGroup ? "bg-yellow-400" : ""}`}>Group</p>
                  </div>

                  <div className='h-full w-full border border-green-500 p-2 flex flex-col gap-2'>
                    {
                      !isGroup
                        ? <div >
                          {/* contacts */}
                          {
                            contact ? <div className='flex flex-col gap-2'>
                              {
                                contact.map((contact,index) => {
                                  return <div key={index} className={`flex flex-col gap-2 ${chat && contact._id == chat._id ? "bg-slate-400" : ""}`}>
                                    <Contact userData={contact} />
                                  </div>
                                })
                              }
                            </div>
                              : <div>Loading..</div>
                          }
                        </div>
                        : <div>
                          {/* group  */}
                          {
                            group ? <div className='flex flex-col gap-2'>
                              {
                                group.map((contact,index) => {
                                  return <div key={index} className={`flex flex-col gap-2 ${chat && contact._id == chat._id ? "bg-slate-400" : ""}`}>
                                    <Contact userData={contact} />
                                  </div>
                                })
                              }
                            </div>
                              : <div>Loading..</div>
                          }
                        </div>
                    }

                  </div>
                </div>
                : <div className='w-[30%] min-w-[340px] h-screen flex flex-col gap-1'>
                  {/* userINfo */}
                   {userInfo && <UserInfo setUserInof={setUserInof} userData={userData}  isUserLogin={isUserLogin} setAnuj={setAnuj}/>}
                   {status && <Status setStatus={setStatus} setAnuj={setAnuj} userData={userData} contact={contact}/>}
                </div>
            }

            <div className='w-[70%] min-w-[360px]  px-2'>
              <Chat socket={socket} userData={userData} isUserLogin={isUserLogin} />
            </div>

            {
              fraindRequest && <div> <SendfraindRequest setFraindRequest={setFraindRequest} /></div>
            }
            {/* all user */}
            {
             allUser && <div> <AllUsers setAllUser={setAllUser} isUserLogin={isUserLogin}/></div>
            }
            {
              requests && <div> <Request setRequests={setRequests} allUser={allUser}/> </div>
            }

            {
              createGroup && <div> <CreateGroup
                setCreateGroup={setCreateGroup}
                contact={contact}
                isUserLogin={isUserLogin}
              /></div>
            }
            

          </div>
          : <div>Loading...</div>
      }
    </div>
  )
}

export default Home
