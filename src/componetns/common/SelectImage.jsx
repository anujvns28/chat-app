import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { createAccount } from '../../service/operations/auth';
import SubmmitButton from './SubmmitButton';
import { toast } from 'react-toastify';


const SelectImage = ({text,getImgUrl}) => {
  const [avatrs, setAvatars] = useState([])
  const [profileFile, setPorfileFile] = useState()
  const [profileImage, setPorfileImg] = useState()
  const { signupData } = useSelector((state) => state.user);
  
  const avatarArray = []
  
  const handleAvatars = async () => {
    for (let i = 1; i <= 5; i++) {
      const image = `https://api.multiavatar.com/Binx%${Math.round(Math.random() * 1000)}ond.svg`
      avatarArray.push(image)
    }

    if (avatarArray.length === 5) {
      setAvatars(avatarArray)
    }
  }

  useEffect(() => {
    handleAvatars()
  }, [])


  const handelFile = (e) => {
    setPorfileFile(e.target.files[0])
    const img = URL.createObjectURL(e.target.files[0])
    setPorfileImg(img)
  }

  const handleClick = () => {
    setPorfileFile(null)
    setPorfileImg(null)
  }

  const handleSelectedAvatars = (url) =>{
    setPorfileImg(url)
    setPorfileFile(url)
  }

  const handelSubmit = async() => {
    if(profileFile){
    const data = {
      ...signupData,
      image : profileFile
    }

    createAccount(data)

    console.log(data,"this is printng hole data ")
    }else{
      // genaret a toast 
      console.log("you are not seletwct image ")
    }
  }

  const handlemyfun = () => {
   if(!profileFile){
    toast.error("You hanv not select img")
   }else{
    getImgUrl(profileFile)
   }
  }


  return (
    <div className='flex flex-col w-full  items-center justify-center '>
      Select imagges
      {
        avatrs.length === 5 ?
          <div className='flex flex-row gap-3'>
            {
              avatrs.map((img,index) => {
                let url = img
                return <div key={index} className='w-[100px] h-[100px] rounded-md'>
                  <img
                    src={url}
                    width={100}
                    key={url}
                  onClick={() => handleSelectedAvatars(url)}
                  />

                </div>
              })
            }
          </div>
          : <div>Loading...</div>
      }

      <div>
        <input
          type='file'
          onChange={handelFile}
        />

        {
          profileFile
            ? <div>
              <img src={profileImage}

                className='w-[150px] h-[150px] rounded-full'
              />

              <button onClick={handleClick}>X</button>
            </div>
            : <div> </div>
        }
      </div>

     
        <SubmmitButton text={text}  handleTask={handlemyfun}/>
    </div>
  )
}

export default SelectImage
