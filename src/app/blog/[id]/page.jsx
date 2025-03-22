'use client'
import Nav from '@/components/Nav'
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { LuClock3 } from "react-icons/lu";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import { LiaComments } from "react-icons/lia";
import { TfiArrowCircleDown, TfiArrowCircleUp } from "react-icons/tfi";

import { IoLogoFacebook, IoLogoTwitter, IoLogoLinkedin, IoMdArrowDropup, IoMdArrowDropdown, IoMdRepeat } from "react-icons/io";
import { FaReddit } from "react-icons/fa";
import { AppContext } from '@/context/appContext';
import axios from 'axios';
import { ApiContext } from '@/context/apiContext';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from "next/navigation";
import { FullLoaders } from '@/components/Loaders';
import { HiveButton } from '@/components/HiveButton';
import Markdown from 'marked-react';



const page =  ({ params }) => {
  const {reply_post, setReplyPost, 
    post_comments, 
    fetchPostComments, likePost,
    dislikePost,
    fetchDislikes,
    dislikes} = useContext(ApiContext); 
  const {reply_inputs, handleReplyInput,  handleReplySubmit, setReplyInput} = useContext(AppContext);
  const {loader, setLoader} = useContext(AppContext)
  const resolvedParams = React.use(params);
  const { id } =  resolvedParams
  const router = useRouter()

  const {BASEURL, fetchLikes, likes} = useContext(ApiContext);
  const [loading, setLoading] = useState(true);
  const [post_loader, setPostLoader] = useState(true);
  const [just_loggedin, setJustLoggedin] = useState(null)
  // const just_loggedin = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('loggedin-user')) : null

  // get single post
  
  const [post, setPost] = useState({});

  const fetchSinglePost = async () => {
    try {
      const response = await axios.get(`${BASEURL}/posts/${id}`)
   
      if(response.data.success){
        setPost(response.data.data)
        setPostLoader(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);

  const [clickedItems, setClickedItems] = useState({}); // Store clicked animation states per post ID

  const handleClick = (id, type) => {
    setClickedItems((prev) => ({ ...prev, [id]: type }));

    setTimeout(() => {
      setClickedItems((prev) => ({ ...prev, [id]: null })); // Reset animation after 200ms
    }, 200);
  };


  useEffect(()=>{
    setLoader(false)
    fetchSinglePost();
    fetchPostComments()
    fetchLikes()
    fetchDislikes()

    const storedUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('loggedin-user') || 'null') : null;
        setJustLoggedin(storedUser);
        setLoading(false);
  }, [id])



  const found_likes = likes?.filter((like)=> (id == like.post && like.liked))
  const is_liked_by_user = found_likes.find((like)=> like.user == just_loggedin?.id)
  const found_dislikes = dislikes?.filter((dislike)=> (id == dislike.post && dislike.disliked))
  const is_disliked_by_user = found_dislikes.find((dislike)=> dislike.user == just_loggedin?.id)

  if (loader) return<FullLoaders/>
 if (loading) return <FullLoaders/>
  return (
    <div>      
      <Nav />

      {post_loader ?  <FullLoaders/>:
      <div className='grid grid-cols-1 justify-items-center items-center mb-6'>
       
        {post &&  <div className='mt-[80px] min-w-fit md:min-w-[900px] max-w-[900px] dark:border-none bg-white dark:bg-[#2C3136] dark:text-white p-10 rounded-sm border pb-10'>
          <h1 className='font-sansSemiBoldPro text-[18px] lg:text-[25px] text-gray-800 dark:text-white text-left uppercase'> {post.title}</h1>
          <div className='flex items-center gap-2 lg:text-[19px] my-3'>
           {post?.avatar ? <div style={{ backgroundImage: `url(${post.avatar.url})`}} className='bg-center bg-cover bg-no-repeat rounded-full h-[45px] w-[45px]'></div>:
            <Image src={'https://cdn.pixabay.com/photo/2016/09/28/02/14/user-1699635_1280.png'} width={45} height={45} alt="avatar"/>
           }
            
            <Link href={`/users/${post.user_id}`} onClick={()=> setLoader(true)} className='font-sansSemiBoldPro text-[#212529] dark:text-white hover:text-[#E31337] transition-all duration-300'>{post.user}</Link>
            <div className='font-sansRegularPro text-gray-500 dark:text-gray-400'>
              <Link href='' className='hover:text-[#E31337] transition-all duration-300 cursor-pointer'>in {post.category}</Link>
              <span className='font-bold text-[20px]'> .</span>
    
              {post.time_created && <span className='font-sansRegularPro hover:text-[#E31337] transition-all duration-300 hover:cursor-pointer'> {formatDistanceToNow(new Date(post?.time_created).toLocaleString(), { addSuffix: true })}</span>}
            </div>
          </div>
          <div className='leading-loose font-serif text-[15px] lg:text-[19px] border border-b-0 border-l-0 border-r-0 py-4 mt-4'>
            <p className='whitespace-pre-line'>{post.content}</p>          
          </div>

          <div className='flex flex-col gap-8'>
            
            {post.images?.map(({url}, idx) => <div key={idx} className='bg-no-repeat bg-cover bg-center w-full min-h-[400px] lg:min-h-[800px]' style={{ backgroundImage: `url(${url})`}}></div>)}
          </div>


          <div className='mt-10 font-sansRegularPro flex flex-wrap items-center gap-1 lg:gap-2'>
            
            {
              post.tags?.map((tag, idx)=>  <div key={idx} className='bg-[#F8F8F8] dark:border-none dark:bg-[#2C3A45] dark:text-white border rounded-md hover:border-black transition-all duration-200 py-1 px-2 text-[10px] md:text-[15px] text-gray-700 hover:cursor-pointer hover:bg-[#F4F4FD]'>#{tag}</div>)
            }
                   
          </div>

        <div className='flex flex-col gap-3 sm:flex-row items-center justify-between'>
        <div className='mt-3 flex flex-wrap items-center gap-1 font-sansRegularPro text-[12px] lg:text-[15px]'>
            <LuClock3 className='text-gray-500 dark:text-gray-400'/>
            
           {post.time_created && <p className='text-gray-500 dark:text-gray-400'>{formatDistanceToNow(new Date(post?.time_created).toLocaleString(), { addSuffix: true })}</p>}
            <span className='text-gray-500 dark:text-gray-400'>in</span>
            <Link href='' className='capitalize text-[#E31337]'>{post.category}</Link>
              <span className='text-gray-500 dark:text-gray-400'>by</span>
              <Link href='' className='font-sansSemiBoldPro'>{post.user}</Link>
           
          </div>
          <div className='flex items-center text-[12px] lg:text-[16px]'>
          <div className='border border-t-0 border-b-0 border-l-0 px-2'>
              <IoMdRepeat size={18} className='text-gray-500 dark:text-gray-400'/>
            </div>
          <div className='border border-t-0 border-b-0 border-l-0 px-2'>
             <p onClick={()=> {just_loggedin ? setReplyPost(true): router.push('/loginerror') }} className='font-sansRegularPro hover:cursor-pointer text-[#E31337]'>Reply</p>
            </div>
          <div className='border border-t-0 border-b-0 border-l-0 px-2 flex items-center gap-2'>
          <LiaComments size={18} className='text-gray-500 dark:text-gray-400'/>
         {post_comments && <p className='font-sansRegularPro text-[#E31337]'>{post_comments.length}</p>}
            </div>
           
          </div>
        </div>
          
          <div className='flex items-center justify-between lg:text-[15px] text-[12px]'>
            <div>

              {just_loggedin ?  <div className="mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100">
    
      <TfiArrowCircleUp
        size={17}
        className={`text-[#E31337] hover:text-white hover:bg-red-600 rounded-full cursor-pointer transition-all duration-200 ease-in-out 
          ${is_liked_by_user ? "bg-red-600 text-white" : ""} 
          ${likeClicked ? "scale-125 rotate-12" : ""}`}
        onClick={() => {
          setLikeClicked(true);
          setTimeout(() => setLikeClicked(false), 200);
          likePost(id, just_loggedin.id);
        }}
      />

     
      <TfiArrowCircleDown
        size={17}
        className={`hover:bg-[#555555] hover:text-white cursor-pointer rounded-full transition-all duration-200 ease-in-out 
          ${is_disliked_by_user ? "bg-[#555555] text-white" : ""} 
          ${dislikeClicked ? "scale-125 rotate-12" : ""}`}
        onClick={() => {
          setDislikeClicked(true);
          setTimeout(() => setDislikeClicked(false), 200);
          dislikePost(id, just_loggedin.id);
        }}
      />
       {found_likes.length > found_dislikes.length && <div className='text-[#E31337] font-sansRegularPro flex items-center gap-1 ml-2'>{found_likes?.length} <IoMdArrowDropup size={20} className='text-gray-500'/> </div>}
       {found_likes.length < found_dislikes.length && <div className='text-[#E31337]  font-sansRegularPro flex items-center gap-1 ml-2'>{found_dislikes?.length} <IoMdArrowDropdown size={20} className='text-gray-500'/> </div>}
    </div>:
            <div className='mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100'>
            <Link href='/loginerror'>
            <TfiArrowCircleUp  size={17} className='text-[#E31337] hover:text-white hover:bg-red-600 rounded-full hover:cursor-pointer'/>
            </Link>
            <Link href='/loginerror'>
            <TfiArrowCircleDown size={17} className=' hover:bg-[#555555] hover:text-white hover:cursor-pointer rounded-full'/>
            </Link>
            {found_likes.length > found_dislikes.length && <div className='text-[#E31337] font-sansRegularPro flex items-center gap-1 ml-2'>{found_likes?.length} <IoMdArrowDropup size={20} className='text-gray-500'/> </div>}
            {found_likes.length < found_dislikes.length && <div className='text-[#E31337] font-sansRegularPro flex items-center gap-1 ml-2'>{found_dislikes?.length} <IoMdArrowDropdown size={20} className='text-gray-500'/> </div>}
            
          </div>}
    
            
            </div>

            <div className='flex items-center gap-1 text-gray-500 dark:text-gray-400'>
                <IoLogoFacebook size={20} className='hover:cursor-pointer hover:text-[#E31337]'/>
                <IoLogoTwitter size={20} className='hover:cursor-pointer hover:text-[#E31337]'/>
                <FaReddit size={20} className='hover:cursor-pointer hover:text-[#E31337]'/>
                <IoLogoLinkedin size={20} className='hover:cursor-pointer hover:text-[#E31337]'/>
            </div>
          </div>
        </div> }      

          
{reply_post && <div className="my-5 bg-white dark:bg-[#2C3136] dark:text-white rounded-md shadow-md border lg:min-w-[900px] py-12 lg:px-[70px] px-[45px]">
          <header className="flex justify-between items-center pb-4">
            <h2 className="font-sans font-[400] text-[15px] lg:text-[20px] text-gray-800 dark:text-white">Reply Post</h2>          
          </header>
            <form action="" onSubmit={handleReplySubmit}>
              <div className="py-4 space-y-5">
                <div className='max-h-[30vh] hide-scrollbar overflow-y-auto w-full p-2'>
                <textarea  onChange={handleReplyInput} name="reply" value={reply_inputs.reply} rows={10} cols={20} placeholder='Write Something...' className='w-full p-2 dark:bg-[#212529] lg:placeholder:text-[16px] placeholder:text-[14px]' required>
                </textarea>
                </div>
                <div className="flex items-center justify-between font-sansRegularPro">
                  <HiveButton
                  btnaction={'submit'}
                  styles={'text-[16px] lg:text-[18px] py-4 px-6'}
                  caption={'Reply'}
                  />  

                  <button 
                  onClick={()=> {setReplyPost(false), setReplyInput({ reply: ''})}} 
                  type="button" 
                  className="py-4 px-6 text-gray-500 dark:text-gray-300 hover:text-[#E31337] transition-all duration-300 text-[16px] lg:text-[18px]">
                    Close</button>  
              </div>           
            </div>
            </form>     
    </div> }       

        <div className='mt-5 max-w-[900px] flex flex-col gap-5' id='comments'>
          {
            post_comments?.map((comment)=>{

              const {_id, user:{_id: user_id, username, avatar}, reply, updatedAt} = comment
             
              const found_likes = likes?.filter((like)=> (_id == like.post && like.liked))
              const is_liked_by_user = found_likes.find((like)=> like.user == just_loggedin?.id)
              
              const found_dislikes = dislikes?.filter((dislike)=> (_id == dislike.post && dislike.disliked))
              const is_disliked_by_user = found_dislikes.find((dislike)=> dislike.user == just_loggedin?.id)

              return(
                <div className='flex items-start gap-1 sm:min-w-full md:min-w-[900px] max-w-[900px]' key={_id}>
                {avatar ? <div style={{ backgroundImage: `url(${avatar.url})`}} className='bg-center bg-cover bg-no-repeat rounded-full h-[45px] w-[45px]'></div>
                  :<div>
                  <Image src='https://images.hive.blog/p/EEEoA8oLaAxsTkPYAARp78o5cJA1o6Chv9x98TzCFT6v5HwqDstWtyVDRwyBsaR2vDdSkUk1cx87Ps9bUepx88LDF47qc3R1DxvV6ZB54Jq3eM3fXfKD34GkdqBWfvDF7QtuVPHfKFss5LK4ajZiW?width=128&height=128' 
                  height={50} width={50} alt='profilepic'
                  className='rounded-full'/>
                </div>}
                <div className='bg-white dark:bg-[#2C3136] dark:text-white dark:border-transparent rounded-md border w-full p-1 text-[#333333]'>
                  <div className='dark:border-0 border border-t-0 border-l-0 border-r-0 p-1 text-[12px] lg:text-[15px] flex items-center gap-1'>

                   <Link href={`/users/${user_id}`} className='font-sansSemiBoldPro hover:text-[#E31337] hover:cursor-pointer'>{username}</Link>
                   <IoMdArrowDropdown size={20} className='text-gray-500 dark:text-gray-400'/> 
                   {updatedAt && <p className='text-gray-500 dark:text-gray-400 font-sansRegularPro hover:text-[#E31337] hover:cursor-pointer'>{formatDistanceToNow(updatedAt, { addSuffix: true })}</p>}
                    </div>
                  <p className='font-sansRegularPro text-[12px] lg:text-[15px] p-1 dark:border-0 border border-t-0 border-l-0 border-r-0 capitalize'>{reply}</p>
                  
                  {
                    just_loggedin ?  <div key={_id} className="text-[12px] lg:text-[15px] mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100">
                              
                              <TfiArrowCircleUp
                                size={17}
                                className={`text-[#E31337] hover:text-white hover:bg-red-600 rounded-full cursor-pointer transition-all duration-200 ease-in-out
                                  ${is_liked_by_user ? "bg-red-600 text-white" : ""} 
                                  ${clickedItems[_id] === "like" ? "scale-125 rotate-12" : ""}`}
                                onClick={() => {
                                  handleClick(_id, "like");
                                  likePost(_id, just_loggedin.id);
                                }}
                              />
                    
                              
                              <TfiArrowCircleDown
                                size={17}
                                className={`hover:bg-[#555555] hover:text-white cursor-pointer rounded-full transition-all duration-200 ease-in-out
                                  ${is_disliked_by_user ? "bg-[#555555] text-white" : ""} 
                                  ${clickedItems[_id] === "dislike" ? "scale-125 rotate-12" : ""}`}
                                onClick={() => {
                                  handleClick(_id, "dislike");
                                  dislikePost(_id, just_loggedin.id);
                                }}
                              />
                              {found_likes.length > found_dislikes.length  && <div className='text-[#E31337] font-sansRegularPro flex items-center gap-1 ml-2'>{found_likes?.length} <GoChevronUp className='text-gray-800'/></div>}
                              {found_likes.length < found_dislikes.length  && <div className='text-[#555555] font-sansRegularPro flex items-center gap-1 ml-2'>{found_dislikes?.length}<GoChevronDown className='text-[#555555]'/></div>}
                            </div>:
                  <div className='mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100'>
                  <Link href='/loginerror'>
                  <TfiArrowCircleUp size={17} className='text-[#E31337] hover:text-white hover:bg-red-600 rounded-full hover:cursor-pointer'/>
                  </Link>
                  
                  <Link href='/loginerror'>
                  <TfiArrowCircleDown size={17} className=' hover:bg-[#555555] hover:text-white hover:cursor-pointer rounded-full'/>
                  </Link>                  
                  {found_likes && <div className='text-[#E31337] text-[15px] font-sansRegularPro flex items-center gap-1 ml-2'>{found_likes?.length}</div>}
                  
                </div>
                  }                 
                  
                </div>
              </div>
              )
            }
           
            
            )
          }
          
        </div>
      </div>
}

    </div>
  )
}

export default page


