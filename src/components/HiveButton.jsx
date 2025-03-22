import React from 'react'

const HiveButton = ({func, caption, styles, btnaction}) => {
  return (
    <button onClick={func}
    type ={btnaction}    
     className={`${styles} hover:cursor-pointer bg-[#1F2326] dark:bg-white dark:text-[#1F2326] dark:hover:text-white text-white font-sansSemiBoldPro shadow-[3px_3px_0_rgba(220,38,38,1)] transition-all duration-300 dark:hover:bg-[#E31337] hover:bg-[#E31337] hover:shadow-[4px_4px_0_rgba(31,35,38,1)] dark:hover:shadow-[4px_4px_0_rgba(255,255,255,1)]`}>
          {caption}
        </button>
  )
}
const EditButton = ({func}) => {
  return (
    <button onClick={func}   
     className={`p-3  min-w-[100px] hover:cursor-pointer bg-[#2b87ce] text-white font-sansSemiBoldPro transition-all duration-300 dark:hover:bg-[#298959] hover:bg-[#298959] shadow-[3px_3px_0_rgba(31,35,38,1)]  hover:shadow-[6px_6px_0_rgba(220,38,38,1)] dark:hover:shadow-[6px_6px_0_rgba(220,38,38,1)]`}>
         Edit
        </button>
  )
}





export {HiveButton, EditButton}
