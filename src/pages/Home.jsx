import React from 'react'

const Home = () => {
  return (
    <div className='flex w-screen h-screen border flex-row gap-1 border-black p-5'>
     <div className='w-[30%] border h-full border-black flex flex-col gap-1'>
      <div className='h-[115px] w-full border border-black flex flex-col gap-1'>
      <div className='h-[75px] w-full border bg-slate-300'></div>
      <div className='h-[40px] w-full border border-black'></div>
      </div>
      <div className='h-full w-full border border-green-500'></div>
     </div>

     <div className='w-[70%] border h-full  border-black flex flex-col gap-1'>
     <div className='h-[80px] w-full border bg-slate-300'></div>
      <div className='h-full w-full border border-green-500'></div>
     </div>
    </div>
  )
}

export default Home
