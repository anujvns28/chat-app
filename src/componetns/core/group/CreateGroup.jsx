import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import SubmmitButton from '../../common/SubmmitButton';
import { toast } from 'react-toastify';
import { MdCheck } from "react-icons/md";
import SelectImage from '../../common/SelectImage';


const CreateGroup = ({ setCreateGroup, contact }) => {
  const [members, setMembers] = useState([]);
  const [step,setStep] = useState(1);

  //console.log(contact,"this are contacts")
  const imgContainer = [
    {
      id: 1,
      name: 'Anuj Yadav',
      img: "https://api.multiavatar.com/Binx%487ond.svg"
    },
    {
      id: 2,
      name: 'Arun kurmar',
      img: "https://api.multiavatar.com/Binx%486ond.svg"
    }
    , {
      id: 3,
      name: 'Kisan',
      img: "https://api.multiavatar.com/Binx%587ond.svg"
    }
    , {
      id: 4,
      name: 'Devil',
      img: "https://api.multiavatar.com/Binx%437ond.svg"
    }
    , {
      id: 5,
      name: 'Something',
      img: "https://api.multiavatar.com/Binx%489ond.svg"
    },
    {
      id: 6,
      name: 'Sachin',
      img: "c"
    },
    {
      id: 7,
      name: 'Anuj Yadav',
      img: "https://api.multiavatar.com/Binx%487ond.svg"
    },
    {
      id: 8,
      name: 'Arun kurmar',
      img: "https://api.multiavatar.com/Binx%486ond.svg"
    }
    , {
      id: 9,
      name: 'Kisan',
      img: "https://api.multiavatar.com/Binx%587ond.svg"
    }
    , {
      id: 10,
      name: 'Devil',
      img: "https://api.multiavatar.com/Binx%437ond.svg"
    },
    {
      id: 11,
      name: 'Something',
      img: "https://api.multiavatar.com/Binx%489ond.svg"
    },
    {
      id: 12,
      name: 'Sachin',
      img: "https://api.multiavatar.com/Binx%899.svg"
    },
  ]

  const handleMember = (person) => {
    let mem = [...members]
    const index = mem.findIndex((item) => item.id == person.id)
    if (index < 0) {
      mem.push(person)
    } else {
      mem.splice(index,1)
      setMembers(mem)
    }
    setMembers(mem)
  }

  const handleStep1 = () => {
    if(members.length >= 2){
      setStep(2)
    }else{
      toast.error("Select at least 2 member")
    }
  }

  const handleProfileImg = (url) => {
    console.log(url ,"profile url")
  }



  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
      <div className='border border-black w-[70%]  bg-slate-200 rounded-md p-4'>
       {/* seletct group members */}
        {
          step == 1 && 
          <div className='w-full h-full'>
            <div className='w-full flex items-center justify-between p-3 '>
          <p className='w-[60%] flex items-center justify-end text-2xl font-semibold'>Chouse group members</p>
          <p className='text-2xl font-semibold cursor-pointer w-fit'
            onClick={() => setCreateGroup(false)}><RxCross1 />
          </p>
        </div>

        <div className='w-full  justify-center items-center flex flex-col gap-5'>
          <div className='flex flex-row p-4  w-[80%] min-h-[100px] items-center justify-center border border-black rounded-md'>
            {
              members.length == 0
                ? <p>Select</p>
                : <div className='flex flex-row gap-3 flex-wrap items-center justify-center'>
                  {
                    members.map((mem) => {
                      return <div key={mem.id} className='relative flex flex-col items-center justify-center  p-2'>
                        <img
                          className='w-[70px]  h-[70px] rounded-full cursor-pointer'
                          src={mem.img} />
                        <p onClick={() => handleMember(mem)}
                        className='absolute -top-1 -right-1 cursor-pointer text-2xl font-semibold'><RxCross1 /></p>
                        <p>{mem.name}</p>
                      </div>
                    })
                  }
                </div>
            }
          </div>

          <div className='flex flex-wrap flex-row gap-3 w-[80%] items-center justify-center '>
            {
              imgContainer.map((mem) => {
                return <div key={mem.id} className=' flex flex-col items-center justify-center'>
                  <div>
                  {
                    members.findIndex((item) => item.id == mem.id) < 0
                      ? <img onClick={() => handleMember(mem)}
                      className={` w-[70px] h-[70px] rounded-full cursor-pointer`}
                      src={mem.img}
                    />
                      :
                      <div className=' z-50 w-[70px] h-[70px]  text-2xl font-semibold '>
                        <div className='w-[70px] h-[70px] bg-slate-600 opacity-80 rounded-full absolute border border-black flex items-center justify-center '>
                          <p className='opacity-100 text-3xl font-semibold text-black'><MdCheck/></p>
                        </div>
                      <img onClick={() => handleMember(mem)}
                      className={`-z-10  w-[70px] h-[70px] rounded-full cursor-pointer`}
                      src={mem.img}
                    />
                      </div>
                  }
                  </div>
                  <p>{mem.name}</p>
                </div>
              })
            }
          </div>

          <SubmmitButton text={"Next"} handleTask={handleStep1} />
        </div>
          </div>
        }

      {/* group information */}
     {
      step == 2 &&
      <div className='w-full h-full'>
         <SelectImage text={"Next"} getImgUrl={handleProfileImg}/>
      </div>
     }

      </div>
    </div>
  )
}

export default CreateGroup
