import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignupData } from '../slice/user';

const VeryfiEmail = () => {
    const [otp, setOtp] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { signupData } = useSelector((state) => state.user);
    const handleSubmit = async(e) =>{
      e.preventDefault();
     if(otp){
      const data = {
        ...signupData,
        otp:otp
      }
      console.log("print data",data)
      dispatch(setSignupData(data))
      navigate("/selectImage");
     }else{
      // genrate toast not enter otp
     }
    }

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center' >
       <div className='text-black border border-black w-[20%]'>
       <p>Email Varfication</p>
     <form>
     <OtpInput
            value={otp}
            onChange={setOtp}
              numInputs={4}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                  
                  }}
                  className="w-[48px] lg:w-[60px] text-black  border border-solid rounded-[0.5rem] text-xl text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button onClick={handleSubmit}
            className='py-3 px-2 bg-yellow-400 border border-black rounded-md'>Verfy</button>
     </form>
       </div>
    </div>
  )
}

export default VeryfiEmail
