'use client'
import Link from 'next/link'
import React from 'react'

const SignupCard = ({title, price, listItems, smallText}) => {
  
  return (
    <div className="shadow-md mb-4 border rounded-lg sm:min-w-[200px] min-w-[300px] flex flex-col justify-between">
    <div className="border-b px-4 py-2 bg-[#F8F8F8] flex justify-center items-center text-center">
      <h4 className="font-sans text-center text-[26px]">{title}</h4>
    </div>
    <div className="px-4 flex flex-col justify-evenly min-h-[300px]">
      <h1 className="font-sans text-[44px] font-[900] text-center">{price}</h1>
      <ul className="list-none space-y-2 mt-3 mb-4 text-center font-sans">
        {listItems?.map((item, idx)=> <li key={idx}>{item}</li>)}
        {smallText?.map((txt, idx)=> <li key={idx} className='text-[13px]'>{txt}</li>)}
      </ul> 
    </div>
    <div className="border-t px-4 py-3">
      <Link 
      onClick={()=> localStorage.removeItem("editing-user-hive")}
        href="/register" 
        target="_blank" 
        className="block w-full text-[22px] font-sans text-center text-[#E31337] active:bg-[#E31337] focus:outline-none focus:ring focus:ring-[#e313363d] border border-[#E31337] py-2 px-4 rounded-lg hover:bg-[#E31337] hover:text-white transition-all duration-200"
      >
        Sign up
      </Link>
    </div>
  </div>
  )
}

export default SignupCard
