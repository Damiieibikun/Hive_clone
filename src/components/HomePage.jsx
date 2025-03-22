'use client'
import Image from 'next/image';
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { FaExternalLinkAlt } from "react-icons/fa";
import { TfiArrowCircleDown, TfiArrowCircleUp } from "react-icons/tfi";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import { LiaComments } from "react-icons/lia";
import { IoMdRepeat } from "react-icons/io";
import { ApiContext } from '@/context/apiContext';
import { formatDistanceToNow } from 'date-fns';
import CategoryOverview from './CategoryOverview';
import { AppContext } from '@/context/appContext';
import { CiCamera } from "react-icons/ci";
import { FullLoaders } from './Loaders';

const HomePage = ({just_loggedin}) => {
  
  const {fetchAllCategories, 
    all_categories, 
    all_posts, 
    setAllPosts,
    fetchAllPosts,
    fetchPostByCategory,
    no_posts,
    all_users,
    fetchAllUsers, 
    fetchAllComments,
     all_comments, likePost, fetchLikes,
     likes,
     dislikePost,
     fetchDislikes,
     dislikes, login_loader, setLoginLoader} = useContext(ApiContext)
     const {loader, setLoader, setRegisterInputs} = useContext(AppContext)
  

    const [show_overView, setShowOverview] = useState(true)
    const [show_CatInfo, setShowCatInfo] = useState(false)
    const [seletcted_cat, setSelectedCat] = useState('')
    const [seletcted_filter, setSelectedFilter] = useState('')

    const [clickedItems, setClickedItems] = useState({}); 
    const handleClick = (id, type) => {
      setClickedItems((prev) => ({ ...prev, [id]: type }));
  
      setTimeout(() => {
        setClickedItems((prev) => ({ ...prev, [id]: null })); 
      }, 200);
    };
  useEffect(()=>{
    setRegisterInputs({
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      descp: '',
      avatar: '',
      banner: ''
    })
    setLoader(false)
    setLoginLoader(false)
    fetchDislikes()
    fetchAllCategories();
    fetchAllUsers();
    fetchAllPosts();
    fetchAllComments();
    fetchLikes()

  }, [login_loader])


  const arrangeNew =(e)=>{
    const selected_filter = e.target.value;
    setSelectedFilter(selected_filter)
    const copy_post = [...all_posts]
    setAllPosts(copy_post.reverse())
  }


if (loader) return <FullLoaders/>
if (login_loader) return <FullLoaders/>

  return (
    <div>      
      <div className="min-h-screen mt-[80px] gap-5 grid mx-3 grid-cols-1 xl:grid-cols-[250px_auto_300px] md:grid-cols-[200px_auto]">     
      <div className='dark:bg-[#2C3136] bg-white px-8 py-6 rounded-md max-h-fit hidden md:block'>
        <p onClick={()=>{fetchAllPosts(), setShowOverview(true), setShowCatInfo(false)}} className='font-sansSemiBoldPro text-[18px] hover:text-[#E31337] transition-all duration-300 py-2 cursor-pointer mb-4 text-[#212529] dark:text-white'>All Posts</p>
        <ul className='font-sansRegularPro text-[16px] leading-normal text-[#212529] dark:text-white'>
          {
            all_categories.map((category) => {
              const {_id, name} = category
              return (
            <li key={_id}>
          <p onClick={()=> {fetchPostByCategory(_id), setShowOverview(false), setShowCatInfo(true), setSelectedCat(_id)}} className='capitalize hover:text-[#E31337] transition-all duration-300 py-1 cursor-pointer'>{name}</p>
          </li>
              )
            })
          }       
         
        </ul>
      </div>

      <div className='p-4 rounded-md'>
        <div className='flex items-center justify-between'>
        <p className='font-sansSemiBoldPro text-[15px] lg:text-[18px] text-[#212529] hidden md:block'>All Posts</p>

        <select onChange={(e)=> {fetchPostByCategory(e.target.value), setShowOverview(false), setShowCatInfo(true), setSelectedCat(e.target.value)}} className='dark:bg-[#2C3136] dark:text-white capitalize lg:w-[270px] px-3 py-2 font-sansRegularPro border rounded-sm text-[#212529] md:hidden text-[15px] lg:text-[18px]'>
          <option value="">All Posts</option>
          {
            all_categories?.map((category) => {
              const {_id, name} = category
              return (
                <option key={_id} value={_id}>{name}</option>
              )
            })
          }         
        
        </select>


        <select onChange={arrangeNew} name="" id="" className='lg:w-[35%] px-3 py-2 font-sansRegularPro border rounded-sm text-[#212529] bg-white text-[15px] lg:text-[18px]'>
          <option value="">Sort</option>
          <option value="oldest">Oldest</option>
          <option value="latest">Latest</option>
        </select>
        </div> 

        <div className='mt-3 flex flex-col gap-3'>
        {
        show_CatInfo && <CategoryOverview cat_id={seletcted_cat} className = 'xl:hidden pl-3 pr-6 py-4' posts = {all_posts} />
      }

          {all_posts?.map((post)=>{
            const {_id, title, category, user, content, createdAt, images} = post
            const matched_category = all_categories?.find((cat)=> cat._id === category)
            const matched_user = all_users?.find((u)=> u._id === user)
            const found_comments = all_comments?.filter((comment)=> _id == comment.post)
            
            const found_likes = likes?.filter((like)=> (_id == like.post && like.liked))
            const is_liked_by_user = found_likes.find((like)=> like.user == just_loggedin?.id)
            const found_dislikes = dislikes?.filter((dislike)=> (_id == dislike.post && dislike.disliked))
            const is_disliked_by_user = found_dislikes.find((dislike)=> dislike.user == just_loggedin?.id)
         
          
             if(matched_user) return(
              <div className='dark:bg-[#2C3136] bg-white p-2 rounded-md border dark:border-none' key={_id}>
                <div className='flex items-center gap-2 text-[12px] lg:text-[14px]'>
               
                {matched_user?.avatar ? <div  className='rounded-full w-[20px] h-[20px] bg-center bg-no-repeat bg-cover' style={{ backgroundImage: `url('${matched_user.avatar.url}')`}}></div>:
               
                <Image src={'https://cdn.pixabay.com/photo/2016/09/28/02/14/user-1699635_1280.png'} width={20} height={20} alt="avatar"/>   
                }
                
                <Link href={`/users/${matched_user?._id}`} onClick={()=> setLoader(true)} className='font-sansSemiBoldPro text-[#212529] hover:text-[#E31337] transition-all duration-300 dark:text-white'>{matched_user?.username}</Link>
                <div className='font-sansRegularPro text-gray-500 dark:text-gray-400'> 
                <Link href='' className='hover:text-[#E31337] transition-all duration-300 cursor-pointer'>in {matched_category?.name}</Link>
                <span className='font-sansRegularPro hover:text-[#E31337] transition-all duration-300 hover:cursor-pointer'> . {formatDistanceToNow(new Date(createdAt).toLocaleString(), { addSuffix: true })}</span>
                </div>          
                </div>

                <div className='mt-2 flex flex-col md:flex-row items-start gap-3'>

                {images && images.length > 0 ? <div className='bg-no-repeat bg-center bg-cover w-full h-[300px] md:w-[135px] md:h-[85px]' style={{ backgroundImage: `url(${images[0].url})`}}></div>:
                <div className='self-center'>
                  <CiCamera  className='bg-no-repeat bg-center bg-cover w-full h-[300px] md:w-[135px] md:h-[85px] dark:text-white text-gray-500'/>
                </div>
                }
                
                <div className='w-full'>
                  <Link href={`/blog/${_id}`} onClick={()=>{localStorage.setItem('hive-post-id', _id); setLoader(true)}} className='border border-t-0 border-l-0 border-r-0 w-full pb-3 border-gray-100 leading-5'>
                  <p className='font-sansSemiBoldPro  text-[12px] lg:text-[15px] m-0 dark:text-white'><span className='uppercase'>{title[0]}</span>{title.slice(1)}</p>
                  <p className='font-sans  text-[12px] lg:text-[14px] dark:text-white'>
                  {content.split(' ').slice(0, 15).join(' ')}{content.split(' ').length > 15 && '...'}
                </p>
                  </Link>

                <div className='flex items-center gap-2 text-[14px]'>
                  

                  {just_loggedin ? <div key={post._id} className="mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100">
          
          <TfiArrowCircleUp
            size={17}
            className={`text-[#E31337] hover:text-white hover:bg-red-600 rounded-full cursor-pointer transition-all duration-200 ease-in-out
              ${is_liked_by_user ? "bg-red-600 text-white" : ""} 
              ${clickedItems[post._id] === "like" ? "scale-125 rotate-12" : ""}`}
            onClick={() => {
              handleClick(post._id, "like");
              likePost(post._id, just_loggedin.id);
            }}
          />

          {/* Dislike Button */}
          <TfiArrowCircleDown
            size={17}
            className={`hover:bg-[#555555] hover:text-white cursor-pointer rounded-full transition-all duration-200 ease-in-out
              ${is_disliked_by_user ? "bg-[#555555] text-white" : ""} 
              ${clickedItems[post._id] === "dislike" ? "scale-125 rotate-12" : ""}`}
            onClick={() => {
              handleClick(post._id, "dislike");
              dislikePost(post._id, just_loggedin.id);
            }}
          />
        </div>: <div className='mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100'>
                    <Link href='/loginerror'>
                    <TfiArrowCircleUp size={17} className='text-[#E31337] hover:text-white hover:bg-red-600 rounded-full hover:cursor-pointer'/>
                    </Link>
                   
                   <Link href='/loginerror'>
                   <TfiArrowCircleDown size={17} className=' hover:bg-[#555555] hover:text-white hover:cursor-pointer rounded-full'/>
                   </Link>
            
                  </div>}
            
                  {found_likes > found_dislikes &&
                    <div className='mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100'>
                    <GoChevronUp size={18} className='text-gray-300'/>
                    <p className='font-sans text-[15px] dark:text-white'>{found_likes?.length}</p>
                  </div>
                  }
                  {found_likes < found_dislikes &&
                    <div className='mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100'>
                    <GoChevronDown size={18} className='text-gray-300'/>
                    <p className='font-sans text-[15px] dark:text-white'>{found_dislikes?.length}</p>
                  </div>
                  }
                    
                    <div className='mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100'>
                    <LiaComments size={18} className='text-gray-500'/>
                    {found_comments && <p className='font-sans text-[15px] hover:text-[#E31337] dark:text-white'>{found_comments?.length}</p>}
                  </div>
                  <Link href={`/blog/${_id}#comments`} onClick={()=>{localStorage.setItem('hive-post-id', _id)}} className='mt-2 flex items-center'>
                    <IoMdRepeat size={18} className='text-gray-500 dark:text-white'/>
                  </Link>
                </div>
                </div>
                </div>              
              </div>)
          } 
          )}

          {no_posts &&  <div className='w-full min-h-[65px] bg-[#F3FAF0] dark:bg-[#11161A] dark:text-white dark:border-0 p-7 rounded-sm border mb-10 mx-auto font-sansRegularPro'>
              {no_posts}
          </div>}
        </div>
      </div>     


      {
        show_overView && <div className='dark:bg-[#2C3136] bg-white px-8 py-6 rounded-md max-h-[220px] hidden xl:grid'>
        <p className='font-sansSemiBoldPro text-[18px] hover:text-[#E31337] transition-all duration-300 py-2 cursor-pointer mb-3 dark:text-white'>Explore Hive</p>
        <ul>
          <Link href={'https://hive.io/'} target='_blank' className='text-[#E31337] dark:text-white font-sansRegularPro text-[16px] flex items-center gap-3'>
          What is Hive?
          <FaExternalLinkAlt size={15} className='text-black dark:text-white'/>
          </Link>
          <Link href={'https://hivedapps.com/'} target= '_blank'  className='text-[#E31337] dark:text-white font-sansRegularPro text-[16px] flex items-center gap-3'>
          Hive Dapps
          <FaExternalLinkAlt size={15} className='text-black dark:text-white'/>
          </Link>
          <Link href={'https://hiveblocks.com/'} target= '_blank' className='text-[#E31337] dark:text-white font-sansRegularPro text-[16px] flex items-center gap-3'>
          Blockexplorer
          <FaExternalLinkAlt size={15} className='text-black dark:text-white'/>
          </Link>
          <Link href={'https://wallet.hive.blog/~witnesses'} target= '_blank' className='text-[#E31337] dark:text-white font-sansRegularPro text-[16px] flex items-center gap-3'>
          Vote for Witnesses 
          <FaExternalLinkAlt size={15} className='text-black dark:text-white'/>
          </Link>
          <Link href={'https://wallet.hive.blog/proposals'}  target= '_blank' className='text-[#E31337] dark:text-white font-sansRegularPro text-[16px] flex items-center gap-3'>
          Hive Proposals 
          <FaExternalLinkAlt size={15} className='text-black dark:text-white'/>
          </Link>
        </ul>
        </div>
  
      }

      {
        show_CatInfo && <CategoryOverview cat_id={seletcted_cat} className = 'hidden xl:grid px-8 py-6' posts = {all_posts} />
      }      

    </div>
    </div>
   
  )
}

export default HomePage

