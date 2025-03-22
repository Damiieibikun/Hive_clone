'use client'
import Nav from '@/components/Nav'
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { AiTwotoneCalendar } from "react-icons/ai";
import { IoMdRepeat } from "react-icons/io";
import { TfiArrowCircleDown, TfiArrowCircleUp } from "react-icons/tfi";
import { GoChevronUp } from "react-icons/go";
import { LiaComments } from "react-icons/lia";

const page = () => {
    const [selected_tab, setSelectedTab] = useState('Posts')

  return (
    <>
    <Nav/>
    <div className='mt-[60px] min-h-screen mb-10'>
        <div className='bg-[#2C3136] flex flex-col items-center justify-end text-white p-4 gap-4'>
            <div className='flex items-center gap-3'>
            {/* {post?.avatar ? <div style={{ backgroundImage: `url(http://localhost:5000/${post.avatar.replace(/\\/g, '/')})`}} className='bg-center bg-cover bg-no-repeat rounded-full h-[45px] w-[45px]'></div>:
            <Image src={'https://cdn.pixabay.com/photo/2016/09/28/02/14/user-1699635_1280.png'} width={45} height={45} alt="avatar"/>
           } */}
           <div className='h-[48px] w-[48px] rounded-full bg-white flex items-center justify-center'>
           <Image src={'https://cdn.pixabay.com/photo/2016/09/28/02/14/user-1699635_1280.png'} width={45} height={45} alt="avatar"/> 
           </div>
          
            <p className='font-sansSemiBoldPro text-[30px]'>user.name</p>
            </div>

            <p className='font-sansRegularPro text-[15px]'>user.descp</p>

            <div className='flex items-center font-sansRegularPro text-[14px]'>
                <p className='px-3 border border-t-0 border-b-0 border-l-0 border-white'>(postno) posts</p>
                <p className='px-3 border border-t-0 border-b-0 border-l-0 border-white'>(commentsno) comments</p>
                <p className='px-3 border border-t-0 border-b-0 border-l-0 border-white'>(totallikes) likes</p>
            </div>
            <div className='flex items-center gap-3'>
                <p className='font-sansRegularPro text-[14px]'>@user.username</p>
                <p className='font-sansRegularPro text-[14px] flex items-center gap-1'> <AiTwotoneCalendar className='text-white'/> Joined user.createdAt</p>
            </div>
                        
        </div>
        <div className='bg-[#2C3A45] text-white font-sansSemiBoldPro text-[16px]'>
            <div className='w-[70%] mx-auto flex items-center px-3'>
                <p onClick={()=>{setSelectedTab('Posts')}} className={`${selected_tab === 'Posts'? 'bg-white text-[#2C3A45]': null}  px-3 py-4 hover:bg-white hover:text-[#2C3A45] hover:cursor-pointer`}>Posts</p>
                <p onClick={()=>{setSelectedTab('Comments')}} className={`${selected_tab === 'Comments'? 'bg-white text-[#2C3A45]': null}  px-3 py-4 hover:bg-white hover:text-[#2C3A45] hover:cursor-pointer`}>Comments</p>
                <p onClick={()=>{setSelectedTab('Replies')}} className={`${selected_tab === 'Replies'? 'bg-white text-[#2C3A45]': null}  px-3 py-4 hover:bg-white hover:text-[#2C3A45] hover:cursor-pointer`}>Replies</p>
               
            </div>
        </div>


        <div className='w-[70%] mx-auto flex flex-col gap-3 px-3 mt-3'>
            {[...Array(10)].map((_, _id)=>{
                return (
                    <div className='bg-white p-2 rounded-md border' key={_id}>
                    <div className='flex items-center gap-2 text-[14px]'>
                
                    {/* {matched_user?.avatar ? <div  className='rounded-full w-[20px] h-[20px] bg-center bg-no-repeat bg-cover' style={{ backgroundImage: `url(http://localhost:5000/${matched_user.avatar.replace(/\\/g, '/')})`}}></div>:
                    <Image src={'https://cdn.pixabay.com/photo/2016/09/28/02/14/user-1699635_1280.png'} width={20} height={20} alt="avatar"/>   
                    } */}
                    <Image src={'https://cdn.pixabay.com/photo/2016/09/28/02/14/user-1699635_1280.png'} width={20} height={20} alt="avatar"/>   
                    


                    <Link href='' className='font-sansSemiBoldPro text-[#212529] hover:text-[#E31337] transition-all duration-300'>username</Link>
                    <div className='font-sansRegularPro text-gray-500'> 
                    <Link href='' className='hover:text-[#E31337] transition-all duration-300 cursor-pointer'>in category.name</Link>
                    <span className='font-sansRegularPro hover:text-[#E31337] transition-all duration-300 hover:cursor-pointer'> . createdAt</span>
                    </div>          
                    </div>

                    <div className='mt-2 flex flex-col md:flex-row items-start gap-3'>

                    {/* {images && images.length > 0 ? <div className='bg-no-repeat bg-center bg-cover w-full h-[300px] md:w-[135px] md:h-[85px]' style={{ backgroundImage: `url(http://localhost:5000/${images[0].replace(/\\/g, '/')})`}}></div>:
                    <div className='bg-no-repeat bg-center bg-cover w-full h-[300px] md:w-[135px] md:h-[85px]' style={{'backgroundImage': 'url("https://cdn.pixabay.com/photo/2015/12/09/22/38/camera-1085704_1280.png")'}}>
                    </div>
                    } */}

                    <div className='bg-no-repeat bg-center bg-cover w-full h-[300px] md:w-[135px] md:h-[85px]' style={{'backgroundImage': 'url("https://cdn.pixabay.com/photo/2015/12/09/22/38/camera-1085704_1280.png")'}}>
                    </div>



                    
                    <div className='w-full'>
                    <Link href={`/blog/${_id}`} onClick={()=>{localStorage.setItem('hive-post-id', _id)}} className='border border-t-0 border-l-0 border-r-0 w-full pb-3 border-gray-100 leading-5'>
                    <p className='font-sansSemiBoldPro text-[15px] m-0'>title</p>
                    <p className='font-sans text-[14px]'>
                    {/* {content.split(' ').slice(0, 15).join(' ')}{content.split(' ').length > 15 && '...'} */}
                    content post...
                    </p>
                    </Link>

                    <div className='flex items-center gap-2 text-[14px]'>
                    <div className='mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100'>
                        <TfiArrowCircleUp size={17} className='text-[#E31337] hover:text-white hover:bg-red-600 rounded-full hover:cursor-pointer'/>
                        <TfiArrowCircleDown size={17} className=' hover:bg-[#555555] hover:text-white hover:cursor-pointer rounded-full'/>
                    </div>
                        <div className='mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100'>
                        <GoChevronUp size={18} className='text-gray-300'/>
                        <p className='font-sans text-[15px]'>likes</p>
                    </div>
                        
                        <Link href='' className='mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100'>
                        <LiaComments size={18} className='text-gray-500'/>
                        {/* {found_comments && <p className='font-sans text-[15px] hover:text-[#E31337]'>{found_comments.length}</p>} */}
                        <p className='font-sans text-[15px] hover:text-[#E31337]'>comments.length</p>
                    </Link>
                    <div className='mt-2 flex items-center'>
                        <IoMdRepeat size={18} className='text-gray-500'/>
                    </div>
                    </div>
                    </div>
                    </div>              
            </div>
                )
            })}
            
        </div>      
    </div>
    </>
    
  )
}

export default page
