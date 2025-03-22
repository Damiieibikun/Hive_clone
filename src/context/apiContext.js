'use client'

import { useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config()
const { default: axios } = require("axios");
const { createContext, useState, useEffect } = require("react")

const ApiContext = createContext();
const ApiProvider = ({children})=>{
    const router = useRouter(); 
    const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
    const [just_loggedin, setJustLoggedin] = useState({});

    const [login, setLogin] = useState(false);
    const [reply_post, setReplyPost] = useState(false); 

    // Get all categories
    const [all_categories, setAllCategories] = useState([])
    const [no_cats, setNoCats] = useState('')
    
    // Get all posts
    const [all_posts, setAllPosts] = useState([])
    const [no_posts, setNoPost] = useState('')

    // Get all users
    const [all_users, setAllUsers] = useState([])
    const [no_users, setNoUsers] = useState('')

    //Get all comments
    const[all_comments, setAllComments] = useState([])
    const [no_comments, setNoComments] = useState('')

    // Get post comments
    const [post_comments, setPostComments] = useState([])

    // delete errors
    const [del_Msg, setDelMsg] = useState('')

    // create cat msg
    const [cat_Msg, setCatMsg] = useState('')

    const [login_err,setLoginErr] = useState({
        error: ''
    })

    const [login_loader, setLoginLoader] = useState(false)
    const [logginin, setLoggingIn] = useState(false)
    const [reg_loader, setRegLoader] = useState(false)

    const [creating_post, setCreatingPost] = useState(false)
    const [edit_successful, setEditSuccessful] = useState(false)  


    const [showOtpField, setShowOtpField] = useState(false);
    const [otp_loader, setOtpLoader] = useState('');


    // create user
    const createUser = async (data) => {
        setOtpLoader('Requesting OTP, Please Wait...')
       
        try {
            const response = await axios.post(`${BASEURL}/users/register`, data, { headers: { 'Content-Type': 'multipart/form-data' },})
            if (response.data.success) {
                setOtpLoader('')
                setShowOtpField(true);
                toast.success(response.data.message);
            }      
           
        } catch (error) {
            setRegLoader(false)
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

const handleOTPSubmit = async (email, otp) => {
    setRegLoader(true)
    try {
        const response = await axios.post(`${BASEURL}/users/verify-otp`, { email: email, otp });

        if (response.data.success) {
            setRegLoader(false)
            toast.success(response.data.message)
            toast.success("Registration complete!");
            localStorage.setItem('loggedin-user', JSON.stringify(response.data.data))                
            router.push('/')
             
        }
    } catch (error) {
        toast.error(error.response.data.message);
    }
};
    // edit user
const editUser = async (data) => {
    setRegLoader(true)
    try {
        const response = await axios.put(`${BASEURL}/users/edituser`, data)
        const user_id = data.get('user_id')
        if(response.data.success){   
            setRegLoader(false)         
            toast.success(response.data.message)
            setTimeout(() => {
                localStorage.setItem('loggedin-user', JSON.stringify(response.data.data))
                localStorage.removeItem('editing-user-hive')
                router.push(`/users/${user_id}`)  
          
            }, 2000);
                      
        }
       
    } catch (error) {
        setRegLoader(false)  
        console.log(error)
        toast.error(error.response.data.message)
    }
}

    // login user
    const loginUser = async (data) => {
        setLoggingIn(true)
        try {
            const response = await axios.post(`${BASEURL}/users/login`, data)
            if(response.data.success){  
                setLoginErr({})   
                if(response.data.data.role === 'user'){
                    setLoggingIn(false)
                toast.success('Login successful!')
                setLoginLoader(true)
                setTimeout(() => {                     
                        localStorage.setItem('loggedin-user', JSON.stringify(response.data.data))
                        setLogin(false)
                        router.push('/')                    
                }, 1000);
                 setLoginLoader(false)            
            }          
                if(response.data.data.role === 'admin'){
                    setLoggingIn(false)
                toast.success('Login successful!')
                setLoginLoader(true)
                setTimeout(() => {                     
                        localStorage.setItem('loggedin-admin', JSON.stringify(response.data.data))
                        setLogin(false)
                        router.push('/admin')                    
                }, 1000);
                 setLoginLoader(false)            
            }          
            }
           
        } 
        
        catch (error) {
            setLoggingIn(false)
            console.log(error.response.data)
            setLoginErr((prev)=> ({...prev, error: error.response.data.message}))
        }
    }
    // get all posts
    const fetchAllPosts = async () => {
        try {
            const response = await axios.get(`${BASEURL}/posts/allposts`)
           if(response.data.success){
           setAllPosts(response.data.data)
           }

           if(response.data.data.length > 0){
            setNoPost('')
        }
        else{
            setNoPost('No Posts')
        }
           
        } catch (error) {
            console.log(error)
        }
    }

    // create post
    const createPost = async (data) => {
        setCreatingPost(true)
        try {
            const response = await axios.post(`${BASEURL}/posts/createpost`, data, { headers: { 'Content-Type': 'multipart/form-data' },})
            if(response.data.success){
                setCreatingPost(false)
               localStorage.setItem('test', JSON.stringify(response.data.data))
                toast.success('Post created successfully!')
                setTimeout(() => {
                    router.push('/')
                }, 1000);
                
                }
               
        } catch (error) {
             setCreatingPost(false)
            console.log(error)
            toast.error('Could not create Post!')
            toast.error(error.response.data.message)
        }
    }

    // edit a post
    const editPost = async (id, data) => {
    setEditSuccessful(false)
    setCreatingPost(true)
    try {
        const response = await axios.put(`${BASEURL}/posts/editpost/${id}`, data)
        if(response.data.success){
            setCreatingPost(false)
            toast.success(response.data.message)            
            setEditSuccessful(true)
            fetchAllPosts()
        }
        
    } catch (error) {
        setCreatingPost(false)
        console.log(error)
        toast.error(error.response.data.message)
    }
}
    // remove a post image
    const removePostImage = async (id, image) => {
    setEditSuccessful(false)
    try {
        const response = await axios.put(`${BASEURL}/posts/removepostimg/${id}?image=${image}`)
        if(response.data.success){
            toast.success(response.data.message)            
            setEditSuccessful(true)
            fetchAllPosts()
        }
        
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
}

    // get all users
    const fetchAllUsers = async () => {
        try {
            const response = await axios.get(`${BASEURL}/users/allusers`);
            if(response.data.success){
                if(response.data.data.length > 0){
                    setAllUsers(response.data.data)
                }else{
                    setNoUsers('No users registered')
                }
                
            }
        } catch (error) {
            console.log(error)
        }
    }

    // change user password 
    const changePassword = async (id, data) => {
        
        try {
         const response = await axios.put(`${BASEURL}/users/changepwd/${id}`, data)        
         if(response.data.success){
      
       toast.success(response.data.message)
       setTimeout(() => {
        fetchAllUsers();
        if(response.data.data.role ==='user'){
                router.push(`/users/${id}`)
        }
        else{
            router.push(`/adminpage/${id}`)
        }
        
       }, 2000);
         }
 
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }


    // get all categories
    const fetchAllCategories = async () => {
        try {
            const response = await axios.get(`${BASEURL}/categories/allcategories`)
            if(response.data.success){
                if(response.data.data.length > 0){
                    setAllCategories(response.data.data)
                }else{
                    setNoCats('No categories avaliable')
                }
            }
           
            
        } catch (error) {
            console.log(error)
        }
    }


    // get cat by id
    const [selectedCat, setSelectedCat] = useState({})
    const fetchCategoriesByID = async (id) => {
        try {
            const response = await axios.get(`${BASEURL}/categories?id=${id}`)
            if(response.data.success){
                setSelectedCat(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    // get post by categories
    const fetchPostByCategory = async (id) => {
        try {
            const response = await axios.get(`${BASEURL}/posts?id=${id}`)
            if(response.data.success){
                setAllPosts(response.data.data)
            }

            if(response.data.data.length > 0){
                setNoPost('')
            }
            else{
                setNoPost('No Posts')
            }
        } catch (error) {
            console.log(error)
        }
    }

    // delete a post
    const deletePost = async (id) => {
    try {
        const response = await axios.delete(`${BASEURL}/posts/delete/${id}`)        
      
        if(response.data.success){
            // setDelMsg(response.data.message)
            toast.success(response.data.message)
            setTimeout(() => {
                fetchAllPosts()
            }, 2000);
                    
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
    
    }

 

    // get post comments
    const fetchPostComments = async () => {
        const postid =  localStorage.getItem('hive-post-id')
        try {
            const response = await axios.get(`${BASEURL}/comments/${postid}`)
            if(response.data.success){
                setPostComments(response.data.data)
                }
        } catch (error) {
            console.log(error)
        }
    }

       // create a comment

       const createComment = async (data) => {
        try {
            const response = await axios.post(`${BASEURL}/comments/reply`, data)
            if(response.data.success){
                setReplyPost(false)
                fetchPostComments()
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
       // create a comment

       const editComment = async (id, data) => {
        setEditSuccessful(false)
        setCreatingPost(true)
        try {
            const response = await axios.put(`${BASEURL}/comments/edit/${id}`, data)
            if(response.data.success){
                setCreatingPost(false)
                toast.success(response.data.message)
                setReplyPost(false)
                setEditSuccessful(true)
                fetchPostComments()
            }
            
        } catch (error) {
            setCreatingPost(false)
            console.log(error)
            toast.error(error.response.data.message)
        }
    }


    // get all comments

    const fetchAllComments = async () => {
        try {
            const response = await axios.get(`${BASEURL}/comments/allcomments`)
            if(response.data.success){
                if(response.data.data.length > 0){
                    setAllComments(response.data.data)
                }
                else{
                    setNoComments('No comments')
                }
               
                }
        } catch (error) {
            console.log(error)
        }
    }

    // delete comment

    const deleteComment = async (id) => {
        try {
            const response = await axios.delete(`${BASEURL}/comments/deletecomment/${id}`)
            
            if(response.data.success){
                toast.success(response.data.message)
               
                setTimeout(() => {
                    fetchAllComments()
                }, 2000);
            }
            
        } catch (error) {
          console.log(error) 
          toast.error(error.response.data.message) 
        }
    }

      // get all likes
  const[likes, setLikes] = useState([])
  const fetchLikes = async () => {
    try {
        const response = await axios.get(`${BASEURL}/likes/alllikes`)
        if(response.data.success){
            setLikes(response.data.data)
        }
    } catch (error) {
        console.log(error)
    }
  }


  // get all likes
  const[dislikes, setDislikes] = useState([])
  const fetchDislikes = async () => {
    try {
        const response = await axios.get(`${BASEURL}/likes/dislikes`)
        if(response.data.success){
            setDislikes(response.data.data)
        }
    } catch (error) {
        console.log(error)
    }
  }

      // like post
  const likePost = async(post_id, user_id)=>{
    const like = {
      post: post_id,
      user: user_id,
    }
    try {
        const response = await axios.post(`${BASEURL}/likes/createlike`,  like)
        if(response.data.success){
            
            fetchLikes()
        }
    } catch (error) {
        console.log(error)
    }   
  }
      // dislike post
  const dislikePost = async(post_id, user_id)=>{
    const dislike = {
      post: post_id,
      user: user_id,
    }
    try {
        const response = await axios.post(`${BASEURL}/likes/createdislike`,  dislike)
        if(response.data.success){
           
            fetchDislikes()
        }
    } catch (error) {
        console.log(error)
    }   
  }



    const values ={
        BASEURL,

        login, 
        setLogin,
        
        loginUser,
        setJustLoggedin,
        

        login_err,
        logginin,
        createUser,
        showOtpField,
        otp_loader,
        handleOTPSubmit,
        reg_loader,
        editUser,
       
        all_users,
        fetchAllUsers,
        no_users, 
        setDelMsg,
        del_Msg,

        cat_Msg,
        setCatMsg,
        fetchAllCategories,
        all_categories,
        no_cats,
        fetchCategoriesByID,
        selectedCat,

        createPost,
        all_posts,
        setAllPosts,
        fetchAllPosts,
        fetchPostByCategory,
        no_posts,       
        deletePost,
        editPost,
        creating_post,
        removePostImage,

        reply_post, 
        setReplyPost,

        createComment,
        editComment,
        edit_successful,
        deleteComment,

        fetchPostComments,
        post_comments,
        fetchAllComments,
        all_comments,
        no_comments,

        likePost,
        fetchLikes,
        likes,

        dislikePost,
        fetchDislikes,
        dislikes,

        ToastContainer,  
        Bounce,
        toast,
        login_loader, setLoginLoader,

        changePassword  

    }

    useEffect(()=>{
        const storedUser = JSON.parse(localStorage.getItem('loggedin-user'))
        if(storedUser) {
            setJustLoggedin((prev)=> prev = storedUser)
        }
        
    }, [])

    return(
        <ApiContext.Provider value={values}>
            {children}
        </ApiContext.Provider>
    )
}

export {ApiContext}
export default ApiProvider;