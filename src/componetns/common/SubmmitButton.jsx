import React from 'react'

const SubmmitButton = ({text,handleTask}) => {
  return (
    <div className='' >
      <div className='py-2 px-3 bg-yellow-400 rounded-md w-[90px] cursor-pointer flex items-center justify-center'
       onClick={handleTask}>
        {text}
      </div>
    </div>
  )
}

export default SubmmitButton
