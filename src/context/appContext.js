'use client'
import { createContext, useContext, useState } from "react";
import { ApiContext } from "./apiContext";
const AppContext = createContext();
const AppProvider = ({ children }) => {
  

  const {createUser,    
    editUser,
    loginUser, 
    createPost,
    createComment, editPost, changePassword} = useContext(ApiContext)

    const editing_user = typeof window !== "undefined" ? localStorage.getItem("editing-user-hive") : null;

  // all loaders
const [loader, setLoader] = useState(false)

const[field_errors, setFieldError] = useState('')

    
// register user
  const [register_inputs, setRegisterInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    firstname:'',
    lastname:'',
    descp: ''
  })
  const [otp, setOtp] = useState('');

  const handleRegisterInputs = (e)=>{
    const {name, value} = e.target

    setRegisterInputs((prev)=>({
        ...prev,
        [name]: value
    }))

  }

const handleOTP =(e)=>{
  setOtp(e.target.value)
}

  const [password_err, setPasswordErr] = useState({
    password_err: '',
    password_length: ''
  })
  const err_obj = {}

  const checkPassword = ()=>{
    if(register_inputs.password.length < 8){
      err_obj.password_length = '*Password must be at least 8 characters'
    }
    if(register_inputs.password !== register_inputs.confirm_password){
      err_obj.password_err = '*Passwords do not match'
    }
    

    setPasswordErr(err_obj)
    return Object.keys(err_obj).length === 0
  }

  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(null);


  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'avatar') setAvatar(files[0]);
    if (name === 'banner') setBanner(files[0]);
};


  const handleRegisterSubmit = (e)=>{
        e.preventDefault();

        if(register_inputs.username === '' || 
          register_inputs.email  === '' || 
          register_inputs.firstname  === '' ||
          register_inputs.lastname  === ''
          ) {
          setFieldError('*Fill required fields!')          
          return
      }

      setFieldError('')    

        const data = new FormData();
        data.append('username', register_inputs.username);
        data.append('email', register_inputs.email);       
        data.append('firstname', register_inputs.firstname);
        data.append('lastname', register_inputs.lastname);

        data.append('descp', register_inputs.descp);
        if (avatar) data.append('avatar', avatar); 
        if (banner) data.append('banner', banner);

        if(editing_user){
          data.append('user_id', register_inputs.user_id)    
          editUser(data)
          
        }
        else{
          if(checkPassword()){  
            data.append('password', register_inputs.password);        
            createUser(data)
             
            setPasswordErr({
              password_err: '',
              password_length: ''
            })

            // setRegisterInputs({
            //   firstname: '',
            //   lastname: '',
            //   username: '',
            //   email: '',
            //   password: '',
            //   confirm_password: '',
            //   descp: '',
            //   avatar: '',
            //   banner: ''
            // })
                            
           }
        }       
  }

  

  // login user
  const [login_inputs, setLoginInputs] = useState({
    username: '',
    password: ''
  })

  const handleLoginInputs = (e)=>{
    const {name, value} = e.target

    setLoginInputs((prev)=>({
        ...prev,
        [name]: value
    }))

  }

  const handleLoginSubmit = (e)=>{
  
        e.preventDefault();
        loginUser(login_inputs)
        setLoginInputs({
          username: '',
          password: ''
        })
  }

  
  // change user password
  const [change_password_inputs, setChangePasswordInputs] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
    })

    const checkChangePassword = ()=>{
      if(change_password_inputs.new_password.length < 8){
        err_obj.password_length = '*Password must be at least 8 characters'
      }
      if(change_password_inputs.new_password !== change_password_inputs.confirm_password){
        err_obj.password_err = '*Passwords do not match'
      }     
        setPasswordErr(err_obj)
      return Object.keys(err_obj).length === 0
    }

    const changePasswordInputs = (e)=>{
      const {name, value} = e.target
  
      setChangePasswordInputs((prev)=>({
          ...prev,
          [name]: value
      }))
  
    }
  
    const handlePasswordSubmit = (id)=>{   
         
          if(checkChangePassword()){
            delete change_password_inputs.confirm_password

            console.log(change_password_inputs)
            console.log(id)           
            changePassword(id, change_password_inputs)  
            
            setPasswordErr({
              password_err: '',
              password_length: ''
            })

          }
          
          setChangePasswordInputs({
            old_password: '',
            new_password: '',
            confirm_password: ''
            })
         
    };


  // create a post
  const [post_inputs, setPostInputs] = useState({
    category: '',
    title: '',
    content: '',
    images: [],
    tags: []
  })

const handlePostInputs = (e)=>{
  const {name, value} = e.target
  setPostInputs((prev)=>({
    ...prev,
    [name]: value

  }))
}


const handleImagesInput = (e) => {
  const files = Array.from(e.target.files); // Convert FileList to an array
  setPostInputs((prev) => ({
      ...prev,
      images: [...prev.images, ...files] // Append new files
  }));
};


const handleTagInput = ()=>{
  const input = document.getElementById('tags')
  const value = input.value
  setPostInputs((prev)=>({
    ...prev,
    tags: [...prev.tags, value]
    }))
    input.value = ''
}

const removeTag = (index)=>{
  setPostInputs((prev)=>({
    ...prev,
    tags: prev.tags.filter((tag, idx) => idx !== index)
    }))
}
const removeImage = (index)=>{
  setPostInputs((prev)=>({
    ...prev,
    images: prev.images.filter((img, idx) => idx !== index)
    }))
}

const handlePostSubmit = (e)=>{
  e.preventDefault();
  if(post_inputs.category === '' || post_inputs.title  === '' || post_inputs.content  === '') {
    setFieldError('*Fill required fields!')          
    return
}
setFieldError('') 
     const storedUser = localStorage.getItem('loggedin-user')
    const user_id  = storedUser ? JSON.parse(storedUser).id : ''
    const post_data = new FormData();
    post_data.append('category', post_inputs.category);
    post_data.append('title', post_inputs.title);
    post_data.append('content', post_inputs.content);
    post_inputs.images.forEach((image) => {
      post_data.append('images', image);
  });
    post_data.append('tags', post_inputs.tags);
    post_data.append('user', user_id);


  createPost(post_data)
  
  setPostInputs((prev)=>({
    ...prev,
    category: '',
    title: '',
    content: '',
    images: [],
    tags: []
  }))
}
const handlePostedit = (id, JSONdata)=>{

    const edit_data = new FormData();
    edit_data.append('category', JSONdata.category);
    edit_data.append('title', JSONdata.title);
    edit_data.append('content', JSONdata.content);
    // Append each image file individually
    JSONdata.images?.forEach((image) => {
      edit_data.append('images', image);
  });
  edit_data.append('tags', JSONdata.tags);
  edit_data.append('user', JSONdata.user);


  editPost(id, edit_data)
}


  // reply a post
  const [reply_inputs, setReplyInput] = useState({
    reply: ''
  })

  const handleReplyInput = (e)=>{
    const {name, value} = e.target

    setReplyInput((prev)=>({
        ...prev,
        [name]: value
    }))

  }

  const handleReplySubmit = (e)=>{
        e.preventDefault();
    const storedUser = localStorage.getItem('loggedin-user')
    const storedPost = localStorage.getItem('hive-post-id')
    const user_id  = storedUser ? JSON.parse(storedUser).id : ''
    const post_id  = storedPost ? storedPost : ''
    
    const full_reply = {
      reply: reply_inputs.reply,
      user: user_id,
      post: post_id
    }    
    console.log(full_reply)
    createComment(full_reply)

    setReplyInput({
      reply: ''
    })
    
    
  }


  const values = {
    
    login_inputs,
    handleLoginInputs,
    handleLoginSubmit,

    register_inputs,
    setRegisterInputs,
    handleRegisterInputs,
    otp,
    handleOTP,
    handleFileChange,
    avatar,
    banner,
    handleRegisterSubmit,
 
    reply_inputs, 
    handleReplyInput,
    handleReplySubmit,
    setReplyInput,

    password_err,

    post_inputs,
    handlePostInputs,
    handleImagesInput,
    removeImage,
    handleTagInput,
    removeTag,
    handlePostSubmit,
    field_errors,
    handlePostedit,
    loader, setLoader,

    change_password_inputs, changePasswordInputs,
    handlePasswordSubmit,   
    };

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext }; // Export context for use in other components
export default AppProvider;
