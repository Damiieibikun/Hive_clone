'use client'
import Nav from '@/components/Nav'
import Image from 'next/image'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { AiTwotoneCalendar } from "react-icons/ai";
import { IoMdRepeat } from "react-icons/io";
import { TfiArrowCircleDown, TfiArrowCircleUp } from "react-icons/tfi";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import { LiaComments } from "react-icons/lia";
import axios, { all } from 'axios';
import { ApiContext } from '@/context/apiContext';
import { formatDistanceToNow } from 'date-fns';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { AppContext } from '@/context/appContext';
import { CiCamera } from "react-icons/ci";
import { EditButton, HiveButton } from '@/components/HiveButton';
import { FullLoaders, MiniLoader, UserLoader } from '@/components/Loaders';

const page = ({params}) => {
    const resolvedParams = React.use(params);
  const { id } =  resolvedParams;
    const [just_loggedin, setJustLoggedinUser] = useState(null);
     const [loading, setLoading] = useState(true);
  
  const {loader, setLoader, handlePostedit, getSafeDate} = useContext(AppContext);

  const{BASEURL, fetchAllPosts, 
    fetchAllComments, all_posts, all_comments, deleteComment, all_users,
    fetchAllUsers, fetchAllCategories,
    all_categories,likePost, deletePost, fetchLikes,
    likes,
    dislikePost,
    fetchDislikes,
    dislikes, editComment, edit_successful, removePostImage, creating_post} = useContext(ApiContext)
    const [selected_tab, setSelectedTab] = useState('Posts')

    const [user_loader, setUserLoader] = useState(true)
    const [user_info, setUserInfo] = useState({})

    const [postsData, setPostsData] = useState([])
    const [seePosts, setSeePosts] = useState(true)

    const [commentsData, setCommentsData] = useState([])
    const [seeComments, setSeeComments] = useState(false)


    const [replyData, setReplyData] = useState([])
    const [seeReplies, setSeeReplies] = useState(false)

    const [delete_Posts, setDeletePost] = useState(false)
    const [edit_post, setEditPost] = useState({})
    const [selected_postDel, setSelectedPostDel] = useState('')

    const [delete_comment, setDeleteComment] = useState(false)
    const [edit_comment, setEditComment] = useState({})
    const [edit_commentPost, setEditCommentPost] = useState({})
    const [selected_comment, setSelectedComment] = useState('')


    const [isEditPost, setIsEditPost] = useState(false)
    const [isEditComment, setIsEditComment] = useState(false)
   

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(`${BASEURL}/users/allusers/${id}`)
            if(response.data.success){
              setUserLoader(false)
                setUserInfo(response.data.data)
                setPostsData(response.data.data.posts)
            }
        } catch (error) {
            console.log(error)
        }
    }
    

    useEffect(()=>{
      setLoader(false)
        fetchUserInfo()
        fetchAllPosts()
        fetchAllComments()
        fetchAllUsers()
        fetchAllCategories()
        fetchLikes()
        fetchDislikes()

        const storedUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('loggedin-user') || 'null') : null;
        setJustLoggedinUser(storedUser);
        setLoading(false);
    }, [id, edit_successful, edit_post])

  

const {user, posts, comments} = user_info

    const commented_posts = all_posts.filter((post)=>{
        return comments?.some((comment)=>comment.post == post._id)
    })

  const comments_likes = likes?.filter((lke)=>{
    return comments?.some((cmmt)=> cmmt._id == lke.post && lke.liked)
  })
  const comments_dislikes = dislikes?.filter((lke)=>{
    return comments?.some((cmmt)=> cmmt._id == lke.post && lke.disliked)
  })

const total_comments = all_comments?.filter((cmmt)=>{
    return all_posts?.some((post)=> post._id == cmmt.post && post.user == id)
})
const total_likes = likes?.filter((like)=>{
    return all_posts?.some((post)=> post._id == like.post && post.user == id)
})

const post_replies = all_comments?.filter((cmt)=>{
  return posts?.some((post)=> post._id == cmt.post)
})

const safeDate = getSafeDate(user?.createdAt);

const removeTag = (index)=>{
  setEditPost((prev)=>({
    ...prev,
    tags: prev.tags.filter((tag, idx) => idx !== index)
    }))
}

const editPost = ()=>{
  delete edit_post.display_images
  handlePostedit(edit_post._id, edit_post), setTimeout(() => {
  setIsEditPost(false)
  setEditPost({})
}, 1000);
}

const editComments = () =>{
  editComment(edit_comment._id, edit_comment ), setTimeout(() => {
    setIsEditComment(false)
    setEditComment({})
  }, 1000);
}

let comment_notavaliable = 0
let reply_notavaliable = 0

  if (loader) return <FullLoaders/>

if (loading) return <FullLoaders/>;

console.log(edit_successful)

  return (
    <>
    <Nav/>
   { user_info && <div className='mt-[60px] min-h-screen mb-10'>
        <div style={{ backgroundImage: `url('${user?.banner.url}')`}} className='relative bg-[#2C3136] bg-center bg-cover bg-no-repeat flex flex-col items-center justify-end text-white gap-4 h-[220px]'>
            <div className='absolute w-full bg-black h-full opacity-50 p-4 top-0 z-10'></div>
            <div className='flex items-center gap-3 relative z-10'>
            {user?.avatar ? <div style={{ backgroundImage: `url('${user.avatar.url}')`}} className='bg-center bg-cover bg-no-repeat rounded-full h-[45px] w-[45px]'></div>:
           <div className='h-[48px] w-[48px] rounded-full bg-white flex items-center justify-center'>
           <Image src={'https://cdn.pixabay.com/photo/2016/09/28/02/14/user-1699635_1280.png'} width={45} height={45} alt="avatar"/> 
           </div>
           }
           
          
            {user && <p className='font-sansSemiBoldPro text-[20px]  lg:text-[30px] capitalize'>{user.firstname} {user.lastname}</p>}
            </div>

            {user && <p className='font-sansRegularPro text-[13px] lg:text-[15px] relative z-10'>{user.descp}</p>}

            <div className='flex items-center font-sansRegularPro text-[12px] lg:text-[14px] relative z-10'>
                {posts && <p className='px-3 border border-t-0 border-b-0 border-l-0 border-white'>{posts.length} posts</p>}
                <p className='px-3 border border-t-0 border-b-0 border-l-0 border-white'>{total_comments?.length} comments</p>
                <p className='px-3 border border-t-0 border-b-0 border-l-0 border-white'>{total_likes?.length} likes</p>
            </div>
            <div className='flex items-center gap-3 relative z-10 pb-6 text-[12px] lg:text-[14px]'>
               {user && <p className='font-sansRegularPro'>@{user.username}</p>}
                {user && <p className='font-sansRegularPro flex items-center gap-1'> <AiTwotoneCalendar className='text-white'/> Joined {safeDate ? formatDistanceToNow(safeDate, { addSuffix: true }) : "No Date Available"}</p>}
                {/* {user && <p className='font-sansRegularPro flex items-center gap-1'> <AiTwotoneCalendar className='text-white'/> Joined {new Date(user.updatedAt).toLocaleString()}</p>} */}
            {
              just_loggedin?.id === user?._id && <Link href={'/register'} onClick={()=>{localStorage.setItem('editing-user-hive', user?._id); setLoader(true)}}>
            <FiEdit size={15}/>
            </Link>}           
            </div>        
           
                        
        </div>
        <div className='bg-[#2C3A45] text-white font-sansSemiBoldPro text-[14px] lg:text-[16px]'>
            <div className='w-[70%] mx-auto flex items-center px-3'>
                <p onClick={()=>{setSelectedTab('Posts'), setSeePosts(true), setSeeComments(false), setSeeReplies(false)}} className={`transition-all duration-300 ${selected_tab === 'Posts'? 'bg-white dark:bg-[#212529] text-[#2C3A45] dark:text-white': null}  px-3 py-4 hover:bg-white dark:hover:bg-[#212529] dark:hover:text-white hover:text-[#2C3A45] hover:cursor-pointer`}>Posts</p>
                <p onClick={()=>{setSelectedTab('Comments'), setSeePosts(false), setSeeComments(true), setSeeReplies(false),setCommentsData(commented_posts)}} className={`transition-all duration-300 ${selected_tab === 'Comments'? 'bg-white dark:bg-[#212529] text-[#2C3A45] dark:text-white': null}  px-3 py-4 hover:bg-white dark:hover:bg-[#212529] dark:hover:text-white hover:text-[#2C3A45] hover:cursor-pointer`}>Comments</p>
                <p onClick={()=>{setSelectedTab('Replies'), setSeeReplies(true), setSeePosts(false), setSeeComments(false), setReplyData(post_replies) }} className={`transition-all duration-300 ${selected_tab === 'Replies'? 'bg-white dark:bg-[#212529] text-[#2C3A45] dark:text-white': null}  px-3 py-4 hover:bg-white dark:hover:bg-[#212529] dark:hover:text-white hover:text-[#2C3A45] hover:cursor-pointer`}>Replies</p>
               
            </div>
        </div>


        <div className='w-[95%] md:w-[70%] mx-auto flex flex-col gap-3 px-3 mt-3'>
            {seePosts && postsData?.map((posts)=>{
                const {_id, category} = posts
                const comment_length = all_comments?.filter((comments)=> comments.post == posts._id)

                const found_likes = likes?.filter((like)=> (posts._id == like.post && like.liked))
                const is_liked_by_user = found_likes?.find((like)=> like.user == just_loggedin?.id)
                const found_dislikes = dislikes?.filter((dislike)=> (posts._id == dislike.post && dislike.disliked))
                const is_disliked_by_user = found_dislikes?.find((dislike)=> dislike.user == just_loggedin?.id)



                return (
                    <div onClick={()=>setDeletePost(false)} className='bg-white dark:border-none dark:bg-[#2C3136] dark:text-white p-2 rounded-md border' key={posts._id}>
                    <div className='flex flex-wrap items-center gap-2 text-[14px]'>
                
                    {user?.avatar ? <div  className='rounded-full w-[20px] h-[20px] bg-center bg-no-repeat bg-cover' style={{ backgroundImage:  `url('${user.avatar.url}')`}}></div>:
                    <Image src={'https://cdn.pixabay.com/photo/2016/09/28/02/14/user-1699635_1280.png'} width={20} height={20} alt="avatar"/>   
                    }
                                       


                    {user && <p className='font-sansSemiBoldPro text-[#212529] dark:text-white hover:text-[#E31337] transition-all duration-300'>{user.username}</p>}
                    <div className='font-sansRegularPro text-gray-500 dark:text-gray-400 flex items-center lg:text-[16px] text-[14px]'> 
                    <p className='hover:text-[#E31337] transition-all duration-300 cursor-pointer'>in {category?.name}</p>
                    <span className='font-sansRegularPro hover:text-[#E31337] transition-all duration-300 hover:cursor-pointer'> . {formatDistanceToNow(posts.createdAt, { addSuffix: true })}</span>
                    </div>          
                    </div>

                    <div className='mt-2 flex flex-col md:flex-row items-start gap-3'>

                    {posts.images && posts.images.length > 0 ? <div className='bg-no-repeat bg-center bg-cover w-full h-[300px] md:w-[135px] md:h-[85px]' style={{ backgroundImage: `url(${posts.images[0].url})`}}></div>:
                    <div>
                      <CiCamera className='bg-no-repeat bg-center bg-cover w-full h-[300px] md:w-[135px] md:h-[85px] dark:text-gray-300 text-gray-500'/>
                    </div>
                    }

                       
                    <div className='w-full'>
                    <Link href={`/blog/${posts._id}`} onClick={()=>{localStorage.setItem('hive-post-id', posts._id); setLoader(true)}} className='border border-t-0 border-l-0 border-r-0 w-full pb-3 border-gray-100 leading-5'>
                    {posts && <p className='font-sansSemiBoldPro lg:text-[15px] text-[13px] m-0 capitalize'>{posts.title}</p>}
                     <p className='font-sans lg:text-[14px] text-[12px] capitalize'>
                    {posts.content.split(' ').slice(0, 15).join(' ')}{posts.content.split(' ').length > 15 && '...'}
                    </p>
                    </Link>

                    <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2 text-[14px]'>
                    
                    {just_loggedin ? <div className='mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100'>
                    <TfiArrowCircleUp size={17} className={`text-[#E31337] hover:text-white hover:bg-red-600 rounded-full hover:cursor-pointer ${is_liked_by_user?'bg-red-600 text-white': null}`} onClick={()=>{likePost(_id, just_loggedin.id)}}/>
                    <TfiArrowCircleDown size={17} className={`hover:bg-[#555555] hover:text-white hover:cursor-pointer rounded-full ${is_disliked_by_user?'bg-[#555555] text-white': null}`} onClick={()=>{dislikePost(_id, just_loggedin.id)}}/>

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
                    <p className='font-sans text-[15px]'>{found_likes?.length}</p>
                  </div>
                  }
                  {found_likes < found_dislikes &&
                    <div className='mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100'>
                    <GoChevronDown size={18} className='text-gray-300'/>
                    <p className='font-sans text-[15px]'>{found_dislikes?.length}</p>
                  </div>
                  }
                        
                  <div className='mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100'>
                        <LiaComments size={18} className='text-gray-500'/>
                       
                        <p className='font-sans text-[15px] hover:text-[#E31337]'>{comment_length?.length}</p>
                    </div>
                    <Link href={`/blog/${posts._id}`} onClick={()=>{localStorage.setItem('hive-post-id', posts._id)}} className='mt-2 flex items-center'>
                        <IoMdRepeat size={18} className='text-gray-500'/>
                    </Link>
                    </div>

                    {just_loggedin && just_loggedin?.id === id ?  <div onClick={(e)=> e.stopPropagation()} className='flex flex-col justify-center items-center gap-2'>
                       <HiveButton
                       caption={'Delete post?'}
                       styles={`p-2 text-[13px] ${delete_Posts && selected_postDel === posts._id? 'flex': 'invisible'}`}
                       func={()=>{
                        deletePost(posts._id), 
                        setDeletePost(false)
                        setPostsData((prev)=> prev.filter(post => post._id !== posts._id ))
                       }}
                       />
                                          
                      <div className='flex items-center gap-3'>
                      <FiEdit size={15} onClick={()=>{setDeletePost(false), setIsEditPost(true), setEditPost({...posts, images: [], display_images: posts.images, category: posts.category._id})}} className='hover:text-red-600 hover:cursor-pointer'/>
                      <RiDeleteBin5Fill onClick={()=>{setDeletePost(true), setSelectedPostDel(posts._id)}} className='hover:text-red-600 hover:cursor-pointer'/>
                      
                      </div>
                     
                      
                    </div>: null}
                   

                    </div>                  

                    </div>
                    </div>              
            </div>
                )
            })}


            {seeComments && commentsData?.map((posts)=>{
                
                const reply = comments?.filter((comment)=> comment.post == posts._id)
                const user_replied = all_users?.find((user)=> user._id == posts.user)
               const cat_name = all_categories?.find((cat)=> cat._id == posts.category)
               comment_notavaliable = !user_replied ? comment_notavaliable + 1: comment_notavaliable
              return(
                reply?.map((reply)=>{
                  const is_liked_by_user = comments_likes?.find((like)=> like.user == just_loggedin?.id && like.post == reply._id)
             
                const is_disliked_by_user = comments_dislikes?.find((dislike)=> dislike.user == just_loggedin?.id && dislike.post == reply._id)
                 
                const comment_like = comments_likes?.find((lik)=> lik.post == reply?._id)
                const comment_dislike = comments_dislikes?.find((lik)=> lik.post == reply?._id)
              
               if(user_replied) return (
                     <div onClick={()=>setDeleteComment(false)} className='bg-white dark:bg-[#2C3136] dark:text-white dark:border-none p-2 rounded-md border' key={reply._id}>
                     <div className='flex items-center gap-2 text-[14px]'>
                 
                     {user_replied?.avatar ? <div  className='rounded-full w-[20px] h-[20px] bg-center bg-no-repeat bg-cover' style={{ backgroundImage:  `url('${user.avatar.url}')`}}></div>:
                     <Image src={'https://cdn.pixabay.com/photo/2016/09/28/02/14/user-1699635_1280.png'} width={20} height={20} alt="avatar"/>   
                     }                         
                     {user_replied && <Link href={`/users/${user_replied._id}`} className='font-sansSemiBoldPro text-[#212529] dark:text-white hover:text-[#E31337] transition-all duration-300'>{user_replied.username}</Link>}
                     <div className='font-sansRegularPro text-gray-500 dark:text-gray-400 flex items-center'> 
                     <p className='hover:text-[#E31337] transition-all duration-300 cursor-pointer'>in {cat_name?.name}</p>
                     <span className='font-sansRegularPro hover:text-[#E31337] transition-all duration-300 hover:cursor-pointer'> . {formatDistanceToNow(posts.createdAt, { addSuffix: true })}</span>
                     </div>          
                     </div>
 
                     <div className='mt-2 flex flex-col md:flex-row items-start gap-3'>
 
                     {posts.images && posts.images.length > 0 ? <div className='bg-no-repeat bg-center bg-cover w-full h-[300px] md:w-[135px] md:h-[85px]' style={{ backgroundImage: `url(${posts.images[0].url})`}}></div>:
                     <div>
                    <CiCamera className='bg-no-repeat bg-center bg-cover w-full h-[300px] md:w-[135px] md:h-[85px]'/>
                     </div>
                     }
 
                     
                     <div className='w-full'>
                     <Link href={`/blog/${posts._id}`} onClick={()=>{localStorage.setItem('hive-post-id', posts._id)}} className='border border-t-0 border-l-0 border-r-0 w-full pb-3 border-gray-100 leading-5'>
                     {posts && <p className='font-sansSemiBoldPro text-[15px] m-0 capitalize'>{posts.title}</p>}
                      <p className='font-sans text-[14px] capitalize'>
                      {reply.reply.split(' ').slice(0, 15).join(' ')}{reply.reply.split(' ').length > 15 && '...'}
                     </p>
                    
                     </Link>
 
 
                     <div className='flex items-center justify-between'>
                     <div className='flex items-center gap-2 text-[14px]'>
                     
                     {just_loggedin ? <div className='mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100'>
                     <TfiArrowCircleUp size={17} className={`text-[#E31337] hover:text-white hover:bg-red-600 rounded-full hover:cursor-pointer ${is_liked_by_user?'bg-red-600 text-white': null}`} onClick={()=>{likePost(reply._id, just_loggedin.id)}}/>
                     <TfiArrowCircleDown size={17} className={`hover:bg-[#555555] hover:text-white hover:cursor-pointer rounded-full ${is_disliked_by_user?'bg-[#555555] text-white': null}`} onClick={()=>{dislikePost(reply._id, just_loggedin.id)}}/>
 
                   </div>: <div className='mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100'>
                     <Link href='/loginerror'>
                     <TfiArrowCircleUp size={17} className='text-[#E31337] hover:text-white hover:bg-red-600 rounded-full hover:cursor-pointer'/>
                     </Link>
                    
                    <Link href='/loginerror'>
                    <TfiArrowCircleDown size={17} className=' hover:bg-[#555555] hover:text-white hover:cursor-pointer rounded-full'/>
                    </Link>
             
                   </div>}
                   {comments_likes > comments_dislikes && comment_like &&
                     <div className='mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100'>
                     <GoChevronUp size={18} className='text-gray-300'/>
                     <p className='font-sans text-[15px]'>{comments_likes?.length}</p>
                   </div>
                   }
                   {comments_likes < comments_dislikes &&comment_dislike &&
                     <div className='mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100'>
                     <GoChevronDown size={18} className='text-gray-300'/>
                     <p className='font-sans text-[15px]'>{comments_dislikes?.length}</p>
                   </div>
                   }                        
                     </div>
 
 
                     {just_loggedin && just_loggedin?.id === id ?  
                     
                      <div onClick={(e)=> e.stopPropagation()} className='flex flex-col justify-center items-center gap-2'>
                        <HiveButton
                        caption={'Delete Comment?'}
                        styles={`p-2 text-[13px] ${delete_comment && selected_comment === reply._id? 'flex': 'invisible'}`}
                        func={()=>{
                          deleteComment(reply._id), 
                          setDeleteComment(false),
                          fetchUserInfo()
                        }}
                        />                      
                       <div className='flex items-center gap-3'>
                       <FiEdit size={15} onClick={()=>{setIsEditComment(true), setEditComment(reply), setEditCommentPost(posts)}} className='hover:text-red-600 hover:cursor-pointer'/>
                       <RiDeleteBin5Fill onClick={()=>{
                        setDeleteComment(true),
                         setSelectedComment(reply._id)
                        }} className='hover:text-red-600 hover:cursor-pointer'/>
                       
                      
                       </div>
                      
                       
                     </div>
                     
                     : null}
                     </div>
 
                     </div>
                     </div>              
                   </div>
                 )
               if(comment_notavaliable === commentsData.length) return (
                <p className='font-sansRegularPro  min-h-[45px] bg-[#F3FAF0] p-7 rounded-sm border mb-10 dark:bg-[#11161A] dark:text-white dark:border-0'>No Comments </p>
                 )
               })
              )

            })}



            {seeReplies && replyData?.map((replies)=>{
              const{_id, updatedAt, reply} = replies;
              const post_found = all_posts.find((post)=> post._id == replies.post)
              const cat_name = all_categories.find((cat)=> cat._id == post_found?.category)
              const found_user = all_users.find((user)=> user._id == replies.user)

              const reply_like = likes.filter((lik)=> lik.post == replies._id && lik.liked)
              const reply_dislike = dislikes.filter((dislike)=> dislike.post == replies._id && dislike.disliked)

              const is_liked_by_user = reply_like?.find((like)=> like.user == just_loggedin?.id)
              const is_disliked_by_user = reply_dislike?.find((dislike)=> dislike.user == just_loggedin?.id)

              reply_notavaliable = !found_user ? reply_notavaliable + 1: reply_notavaliable
         

             if(found_user) return(
                <div className='flex items-start gap-1 sm:min-w-full md:min-w-[900px] max-w-[900px]' key={_id}>
                {found_user?.avatar ? <div style={{ backgroundImage:  `url('${found_user.avatar.url}')`}} className='bg-center bg-cover bg-no-repeat rounded-full h-[25px] w-[25px]'></div>
                  :<div>
                  <Image src='https://images.hive.blog/p/EEEoA8oLaAxsTkPYAARp78o5cJA1o6Chv9x98TzCFT6v5HwqDstWtyVDRwyBsaR2vDdSkUk1cx87Ps9bUepx88LDF47qc3R1DxvV6ZB54Jq3eM3fXfKD34GkdqBWfvDF7QtuVPHfKFss5LK4ajZiW?width=128&height=128' 
                  height={25} width={25} alt='profilepic'
                  className='rounded-full'/>
                </div>}
                <div className='bg-white dark:bg-[#2C3136] dark:text-white dark:border-none rounded-md border w-full p-1 text-[#333333]'>
                  <div className='dark:border-none border border-t-0 border-l-0 border-r-0 p-1 flex items-center gap-1 text-[14px]'>

                   
                   <Link href={`/users/${found_user?._id}`} className='font-sansSemiBoldPro hover:text-[#E31337] hover:cursor-pointer'>{found_user.username}</Link>
                  
                   <p className='font-sansRegularPro text-gray-500 dark:text-gray-400 flex items-center hover:text-[#E31337] transition-all duration-300 cursor-pointer'>in {cat_name?.name}</p>
                   {updatedAt && <p className='text-gray-500 dark:text-gray-400 font-sansRegularPro hover:text-[#E31337] hover:cursor-pointer'>{formatDistanceToNow(updatedAt, { addSuffix: true })}</p>}
                    </div>
                    <Link href={`/blog/${post_found?._id}`} target='_blank' className='p-1 font-sansSemiBoldPro hover:text-[#E31337]'>RE: <span className='capitalize'>{post_found?.title}</span> </Link>
                  <p className='font-sansRegularPro text-[15px] dark:border-none p-1 border border-t-0 border-l-0 border-r-0 capitalize'>{reply}</p>
                  
                  {
                    just_loggedin ? <div className='mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100'>
                    <TfiArrowCircleUp onClick={()=>{likePost(_id, just_loggedin.id)}} size={17} className={`text-[#E31337] hover:text-white hover:bg-red-600 rounded-full hover:cursor-pointer ${is_liked_by_user ? 'bg-red-600 text-white': null}`}/>
                    <TfiArrowCircleDown onClick={()=>{dislikePost(_id, just_loggedin.id)}} size={17} className={`hover:bg-[#555555] hover:text-white hover:cursor-pointer rounded-full ${is_disliked_by_user ? 'bg-[#555555] text-white': null}`}/>
                    {reply_like.length > reply_dislike.length  && <div className='text-[#E31337] text-[15px] font-sansRegularPro flex items-center gap-1 ml-2'>{reply_like?.length} <GoChevronUp className='text-gray-800'/></div>}
                    {reply_like.length < reply_dislike.length  && <div className='text-[#555555] text-[15px] font-sansRegularPro flex items-center gap-1 ml-2'>{reply_dislike?.length}<GoChevronDown className='text-[#555555]'/></div>}
                    
                  </div>:
                  <div className='mt-2 flex items-center gap-2 border border-t-0 border-b-0 border-l-0 w-fit pr-4 border-gray-100'>
                  <Link href='/loginerror'>
                  <TfiArrowCircleUp size={17} className='text-[#E31337] hover:text-white hover:bg-red-600 rounded-full hover:cursor-pointer'/>
                  </Link>
                  
                  <Link href='/loginerror'>
                  <TfiArrowCircleDown size={17} className=' hover:bg-[#555555] hover:text-white hover:cursor-pointer rounded-full'/>
                  </Link>                  
                  {reply_like.length > reply_dislike.length  && <div className='text-[#E31337] text-[15px] font-sansRegularPro flex items-center gap-1 ml-2'>{reply_like?.length} <GoChevronUp className='text-gray-800'/></div>}
                    {reply_like.length < reply_dislike.length  && <div className='text-[#555555] text-[15px] font-sansRegularPro flex items-center gap-1 ml-2'>{reply_dislike?.length}<GoChevronDown className='text-[#555555]'/></div>}
                  
                </div>
                  }
                  

                </div>
              </div>
              )

              if(reply_notavaliable === replyData.length) return(
                <p className='font-sansRegularPro min-h-[45px] bg-[#F3FAF0] p-7 rounded-sm border mb-10 dark:bg-[#11161A] dark:text-white dark:border-0'>No Replies </p>
              )
            })}      


        </div>  

       {user_loader ? <UserLoader/> :<div className='lg:w-[70%] w-[90%] mx-auto flex flex-col gap-3 px-3 mt-3 lg:text-[16px] text-[14px]'>
        {seePosts && postsData.length === 0 ? <p className='font-sansRegularPro  min-h-[45px] bg-[#F3FAF0] p-7 rounded-sm border mb-10 dark:bg-[#11161A] dark:text-white dark:border-0'>No Posts </p>: null}
        {seeComments && commentsData.length === 0 ? <p className='font-sansRegularPro  min-h-[45px] bg-[#F3FAF0] p-7 rounded-sm border mb-10 dark:bg-[#11161A] dark:text-white dark:border-0'>No Comments </p>: null}
        {seeReplies && replyData.length === 0 ? <p className='font-sansRegularPro  min-h-[45px] bg-[#F3FAF0] p-7 rounded-sm border mb-10 dark:bg-[#11161A] dark:text-white dark:border-0'>No Replies </p>: null}
        </div> }

        
        {isEditPost&& (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#2C3136] dark:text-white p-6 rounded-lg w-[80%] mx-auto overflow-y-auto h-[90vh]">
            
            <div className='flex flex-col gap-1 justify-end items-end font-sansRegularPro'>
            <label htmlFor="postcat">Choose category</label>            
            <select 
            onChange={(e)=> {setEditPost((prev)=>({
              ...prev,
              category: e.target.value
            }))}}
            name="" value={edit_post.category} id="postcat" className='capitalize p-2 rounded-sm border border-gray-300 dark:bg-[#212529] dark:border-0'>
              
            {all_categories?.map((cat)=>
            <option key={cat._id} value={cat._id}>{cat.name}</option>
            )}
            </select>
            </div>       


            {edit_post && <p className='font-sansSemiBoldPro text-xl capitalize mb-5'>Title : {edit_post.title}</p>}
              <div className="space-y-4">

              <div className='flex items-center flex-wrap gap-5 mb-4 justify-center md:justify-start'>
              {edit_post.display_images && edit_post.display_images.length > 0 ? 
              // edit_post.display_images?.map((img, idx)=><div key={idx} className='relative rounded-lg border bg-no-repeat bg-center bg-cover w-32 h-32' style={{ backgroundImage: `url(${img})`}}>
               edit_post.display_images?.map(({url}, idx)=><div key={idx} className='relative rounded-lg border bg-no-repeat bg-center bg-cover w-32 h-32' style={{ backgroundImage: `url(${url})`}}> 
                 <button
                onClick={()=>{
                  removePostImage(edit_post._id, url)
                  edit_successful ? setEditPost((prev)=>({
                    ...prev,
                    display_images: prev.display_images.filter((images) => images.url !== url)
                    })): null
                
                }}
                  type="button"
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm shadow-md transition-transform transform hover:scale-110"
                >
                  ×
          </button>
              </div>):
                     <div >
                            <CiCamera className='rounded-lg border bg-no-repeat bg-center bg-cover w-32 h-32 dark:text-gray-300 text-gray-500'/>    
                     </div>
                }
                {edit_post.images.map((file, index) => (
                <div key={index} className="relative w-32 h-32 overflow-hidden rounded-lg border">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Selected Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                   <button
                  onClick={() =>{
                    setEditPost((prev)=>({
                      ...prev,
                      images: prev.images.filter((img, idx) => idx !== index)
                      }))
                  }}
                  type="button"
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm shadow-md transition-transform transform hover:scale-110"
                >
                  ×
          </button>
                </div>
              ))}

                <div className='self-end flex flex-col gap-1'>
              <label
                    htmlFor="images"
                    className="text-[15px] text-gray-600 dark:text-gray-300 font-sansSemiBoldPro"
                  >
                    Upload more Images:
                  </label>
                  <label
                    htmlFor="images"
                    className="w-fit p-3 bg-[#1F2326] text-white font-sansSemiBoldPro rounded-md shadow-lg hover:bg-[#E31337] transition-all cursor-pointer"
                  >
                    Choose Files
                  </label>
                  <input
                    onChange={(e)=>{
                      const files = Array.from(e.target.files); 
                      setEditPost((prev) => ({
                        ...prev,
                        images: [...prev.images, ...files]
                    }));
                    }}
                    type="file"
                    name="images"
                    id="images"
                    className="hidden"
                  />
                </div>                           
              </div>
           
             
              <label
                htmlFor="title"
                className="text-[15px] mx-0 mb-0 mt-2 text-gray-600 dark:text-gray-300 font-sansSemiBoldPro"
              >
                Title:
              </label>
                <input
                  type="text"
                  onChange={(e)=>setEditPost((prev)=>({...prev, title: e.target.value}))}
                 
                  value={edit_post.title}
                  placeholder="Title"
                  className="capitalize w-full p-2 border rounded dark:bg-[#212529] dark:border-0"
                />
                 <label
                htmlFor="content"
                className="text-[15px] m-0 text-gray-600 dark:text-gray-300 font-sansSemiBoldPro"
              >
                Content:
              </label>
                <textarea
                  type="text"
                                  
                  onChange={(e)=>setEditPost((prev)=>({...prev, content: e.target.value}))}
                  value={edit_post.content}
                  placeholder="Edit Post"
                  className="overflow-y-auto w-full p-2 border rounded min-h-[200px] dark:bg-[#212529] dark:border-0"
                ></textarea>
               

               <label
                htmlFor="tags"
                className="text-[15px] m-0 text-gray-600 dark:text-gray-300 font-sansSemiBoldPro"
              >
                Tags:
              </label>
               <div className="flex flex-wrap gap-2">
                {edit_post.tags?.map((tag, idx) => (
                  <div
                    key={idx}
                    className="relative bg-[#F8F8F8] dark:bg-[#212529] dark:border-none dark:text-white  border border-gray-300 rounded-md px-3 py-1 text-gray-700 flex items-center gap-2 hover:bg-[#F4F4FD] transition-all"
                  >
                    <span>#{tag}</span>
                    <button
                      onClick={() => removeTag(idx)}
                      type="button"
                      className="absolute top-[-5px] right-[-5px] bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm shadow-md transition-transform transform hover:scale-110"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className='flex items-center gap-4 max-w-[500px]'>
              <input
                  id='tags'
                  type="text"
                  placeholder="Add Tags"
                  className="capitalize w-full p-2 border rounded dark:bg-[#212529] dark:border-0"
                />
                <button 
                onClick={()=>{
                  const input = document.getElementById('tags')
                  const value = input.value
                  setEditPost((prev)=>({
                    ...prev,
                    tags: [...prev.tags, value]
                    }))
                    input.value = ''
                }}
                className="p-3 bg-[#1F2326] min-w-fit  text-white font-sansSemiBoldPro rounded-md shadow-md hover:bg-[#E31337] transition-all">Add tag</button>

              </div>

              <div className="flex flex-col justify-end gap-2 h-[70px]">
               { creating_post && <MiniLoader/>   }            
                </div>
                <div className="flex justify-end gap-2">
                  <EditButton         
                  func={editPost}
                  />
                  <HiveButton
                   caption={'Cancel'}
                   styles={'p-3  min-w-[100px]'}
                   func={()=>{
                    !creating_post ?  setIsEditPost(false) : null
                  }}                 
                  />
                 
                </div>
                
                
                
              </div>
            </div>
          </div>
        )}

{isEditComment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#2C3136] dark:text-white p-6 rounded-lg w-[70%] mx-auto">
            {edit_commentPost && <p className='font-sansSemiBoldPro text-xl'>Post: {edit_commentPost.title}</p>}
              <div className="space-y-4">

              {edit_commentPost.images && edit_commentPost.images.length > 0 ? <div className='bg-no-repeat bg-center bg-cover w-full h-[300px] md:w-[135px] md:h-[85px]' style={{ backgroundImage: `url(${edit_commentPost.images[0]})`}}></div>:
                     <div className='bg-no-repeat bg-center bg-cover w-full h-[300px] md:w-[135px] md:h-[85px]' style={{'backgroundImage': 'url("https://cdn.pixabay.com/photo/2015/12/09/22/38/camera-1085704_1280.png")'}}>
                     </div>
                     }
             
               
                <textarea
                  type="text"
                  
                  onChange={(e)=>setEditComment((prev)=>({...prev, reply: e.target.value}))}
                  value={edit_comment.reply}
                  placeholder="Review"
                  className="w-full p-2 border rounded min-h-[200px] dark:bg-[#212529] dark:border-none"
                ></textarea>
               
               <div className="flex flex-col justify-end gap-2 h-[70px]">
               { creating_post && <MiniLoader/>   }            
                </div>
               
                <div className="flex justify-end gap-2">
                  <EditButton
                  func={editComments}
                 
                  />
                <HiveButton
                func={()=> {
                  !creating_post ?  setIsEditComment(false) : null
                 }}
                caption={'Cancel'}
                styles={'p-3  min-w-[100px]'}
                />
                  
                </div>
              </div>
            </div>
          </div>
        )}
        
    </div>}
    </>
    
  )
}

export default page
