import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import Login  from "./Login"
import SubmmitButton from '../componetns/common/SubmmitButton';
import { acceptRequest } from '../service/operations/user';

const Request = () => {
  const {token} = useSelector((state) => state.user);
  const {user} = useSelector((state) => state.user);
  const [userId,setUserId] = useState()
  const negative = useNavigate();
  const params = useParams()
  
  const isUser = () =>{
    if(user){
      setUserId(user._id)
    }
  }
  


  const accRequest = () => {
    const data = {
      userId : userId,
      token :  params.token
    }
   const result =  acceptRequest(data)
  }

  useEffect(() =>{
  isUser()
  },[user])

  

  return (
    <div>
     {
      token ? 
      <div>
        <SubmmitButton text={"Accept"} handleTask={accRequest} />
      </div> 
      : <div><Login/></div>
     }
    </div>
  )
}

export default Request
