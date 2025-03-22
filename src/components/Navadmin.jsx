'use client'

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuExternalLink } from "react-icons/lu";

import { ApiContext } from "@/context/apiContext";
import { useRouter } from "next/navigation";

import { MdOutlineCategory } from "react-icons/md";
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from "@/context/appContext";


const Navadmin = ({selected_tab, setSelectedTab}) => {
    const [isVisible, setIsVisible] = useState(true); // State to track visibility
    const [lastScrollY, setLastScrollY] = useState(0); // State to track last scroll position
    const [isOpen, setIsOpen] = useState(false); 


    const [showCat, setShowCat] = useState(false)
  
    

    const {setLoader} = useContext(AppContext)
  
    const router = useRouter()
    const [just_loggedinadmin, setJustLoggedinadmin] = useState({});

    
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
  
        // Check scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
  
        setLastScrollY(currentScrollY); // Update last scroll position
      };
  
      // Add scroll event listener
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        // Cleanup on unmount
        window.removeEventListener("scroll", handleScroll);
      };
    }, [lastScrollY]);
  
    useEffect(()=>{
      const storedAdmin = JSON.parse(localStorage.getItem('loggedin-admin'))
      if(storedAdmin) {
          setJustLoggedinadmin((prev)=> prev = storedAdmin)
          
      }
      
  }, [])

    return (
    <div>
<nav className={`shadow-md bg-white flex items-center pt-2 pb-1 px-3 justify-between font-sansRegularPro text-[18px] text-gray-700 fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    ><Link href='/' target="_blank">
     <Image
        src="https://hive.blog/images/hive-blog-logo.svg"
        width={120}
        height={120}
        alt="logo"
      />
    </Link>
     
      <ul className="hidden lg:flex items-center gap-6 ml-[100px] text-gray-600">
        <li onClick={()=>setSelectedTab('Allposts')} className="relative group">
          <Link
            href="/admin"
            className={`hover:text-[#E31337] transition-all duration-300 py-2 block ${selected_tab === 'Allposts' ? 'text-[#E31337]':null}`}
          >
            All Posts
          </Link>
          <span className={`absolute bottom-[-10px] left-0 h-0 w-full bg-[#E31337] group-hover:h-[3px] hover:transition-all duration-100 ${selected_tab === 'Allposts' ? 'h-[3px]':null}`}></span>
        </li>
        <li onClick={()=>setSelectedTab('Allusers')} className="relative group">
          <p className={`hover:text-[#E31337] hover:cursor-pointer transition-all duration-300 py-2 block ${selected_tab === 'Allusers' ? 'text-[#E31337]':null}`}>
            All Users
          </p>
          <span className={`absolute bottom-[-10px] left-0 h-0 w-full bg-[#E31337] group-hover:h-[3px] hover:transition-all duration-100 ${selected_tab === 'Allusers' ? 'h-[3px]':null}`}></span>
        </li>
        <li onClick={()=>setSelectedTab('Allcategories')} className="relative group">
          <p className={`hover:text-[#E31337] hover:cursor-pointer transition-all duration-300 py-2 block ${selected_tab === 'Allcategories' ? 'text-[#E31337]':null}`}>
            All Categories
          </p>
          <span className={`absolute bottom-[-10px] left-0 h-0 w-full bg-[#E31337] group-hover:h-[3px] hover:transition-all duration-100 ${selected_tab === 'Allcategories' ? 'h-[3px]':null}`}></span>
        </li>
        <li onClick={()=>setSelectedTab('Allcomments')} className="relative group">
          <p className={`hover:text-[#E31337] hover:cursor-pointer transition-all duration-300 py-2 block ${selected_tab === 'Allcomments' ? 'text-[#E31337]':null}`}>
            All Comments
          </p>
          <span className={`absolute bottom-[-10px] left-0 h-0 w-full bg-[#E31337] group-hover:h-[3px] hover:transition-all duration-100 ${selected_tab === 'Allcomments' ? 'h-[3px]':null}`}></span>
        </li>
      </ul>
      <div className="flex items-center gap-3">
 
{just_loggedinadmin?.id && <div className="flex flex-col gap-1 justify-center items-center">
        
        <Link href={`/adminpage/${just_loggedinadmin.id}`} onClick={()=> setLoader(true)} className="rounded-full border p-1 bg-[#F8F8F8] hover:cursor-pointer shadow-[3px_3px_0_rgba(220,38,38,1)] transition-all duration-300 hover:bg-[#E31337] hover:shadow-[6px_6px_0_rgba(31,35,38,1)]">
        {just_loggedinadmin?.id && <div  className='rounded-full w-[40px] h-[40px] text-center flex items-center justify-center 
        font-bold capitalize bg-black  text-white  text-[13px]'>{just_loggedinadmin?.firstname[0]} {just_loggedinadmin?.lastname[0]} </div>
        }
                  
        </Link>
      </div>
      
      }
       
        
        {just_loggedinadmin?.id ? <button onClick={()=>{setJustLoggedinadmin({}),
       setLoader(true)
                 setTimeout(() => {
                   localStorage.removeItem('loggedin-admin');
                   router.push('/')
                   
                 }, 1000);}} className="hidden sm:block p-2 bg-[#1F2326] text-white font-sansSemiBoldPro shadow-[3px_3px_0_rgba(220,38,38,1)] transition-all duration-300 hover:bg-[#E31337] hover:shadow-[6px_6px_0_rgba(31,35,38,1)] text-[13px]">
          Sign out
        </button>:
        <Link
        href="/registeradmin"
        className="hidden sm:block p-2 bg-[#1F2326] text-white font-sansSemiBoldPro shadow-[3px_3px_0_rgba(220,38,38,1)] transition-all duration-300 hover:bg-[#E31337] hover:shadow-[6px_6px_0_rgba(31,35,38,1)]"
      >
        Sign up
      </Link>}
        

        <Link onMouseOver={()=>setShowCat(true)} onMouseOut={()=>setShowCat(false)} href = {just_loggedinadmin?.id ? '/createcategory' : 'loginerror'} onClick={()=> setLoader(true)} className="relative rounded-full border border-gray-200 p-3 hover:bg-black hover:text-white hover:cursor-pointer hover:transition-all duration-500
        md:bg-[#1F2326] md:text-white font-sansSemiBoldPro md:shadow-[3px_3px_0_rgba(220,38,38,1)] md:transition-all md:duration-300 md:hover:bg-[#E31337] md:hover:shadow-[6px_6px_0_rgba(31,35,38,1)] text-[13px]">
          <MdOutlineCategory size={25} className=" md:hidden" />
         <span className="hidden md:block"> Create Categories</span>
          {showCat && <p className="md:hidden absolute bottom-[-50px] right-0 font-sansRegularPro bg-black text-white text-[12px] rounded-sm px-2 py-1">Create Categories</p>}
        </Link>
        
        <div onClick={() => setIsOpen(true)}>
          <RxHamburgerMenu size={25} className="hover:text-[#E31337] hover:cursor-pointer" />
        </div>
      </div>


 
    </nav>
           {/* side nav */}
      <div className="absolute h-full z-[100]">
      <div className={
        "fixed z-[100] inset-0 transform ease-in-out h-full" +
        (isOpen
          ? "transition-opacity opacity-100 duration-500 translate-x-0"
          : "transition-all delay-500 translate-x-full")
      }>
        <section
          className={
            "bg-[#11161A] text-white w-screen max-w-[16rem] right-0 absolute h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
            (isOpen ? "translate-x-0" : "translate-x-full")
          }
        >
          <article onClick={() => setIsOpen(false)} className="relative w-screen max-w-[16rem] overflow-y-scroll h-full">
            <header className="p-3 font-AmazonEmber capitalize flex gap-2 items-center justify-end">
               <span className="hover:cursor-pointer hover:text-red-600 hover:transition-all duration-200">X</span>
            </header>
            <div className="sm:hidden">
            <div className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
             {just_loggedinadmin && <p className="font-sans text-[15px]" onClick={()=>{setJustLoggedinadmin({}), 
           setLoader(true)
                    setTimeout(() => {
                      localStorage.removeItem('loggedin-admin');
                      router.push('/')
                      setLoader(false)
                    }, 2000);}}>Sign out</p>} 
            </div>
            <div className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <Link href='/registeradmin' onClick={()=> setLoader(true)} className="font-sans text-[15px] flex items-center gap-2">Sign Up
              <LuExternalLink className="text-gray-400 hover:text-red-600"/>
              </Link> 
            </div>
            </div>
           
           <div className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <p className="font-sans text-[15px]">Welcome</p> 
            </div>
           <div onClick={()=>setSelectedTab('Allposts')} className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <p className="font-sans text-[15px]">All Posts</p> 
            </div>
           <div onClick={()=>setSelectedTab('Allusers')} className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <p className="font-sans text-[15px]">All Users</p> 
            </div>
           <div onClick={()=>setSelectedTab('Allcategories')} className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <p className="font-sans text-[15px]">All Categories</p> 
            </div>
           <div onClick={()=>setSelectedTab('Allcomments')} className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <p className="font-sans text-[15px]">All Comments</p> 
            </div>
           <div className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <p className="font-sans text-[15px]">FAQ</p> 
            </div>
         
           <div className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <p className="font-sans text-[15px]">Night Mode</p> 
            </div>
           <div className='p-4 space-y-6 border border-gray-800'></div>

           <div className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <Link href={`/passwordchange/${just_loggedinadmin.id}`} target="_blank"  className="font-sans text-[15px] flex items-center gap-2">Change Accounts Password
              <LuExternalLink className="text-gray-400 hover:text-red-600"/>
                </Link>              
            </div>
           <div className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <Link href={'/registeradmin'} target="_blank" className="font-sans text-[15px] flex items-center gap-2">Register New Admin
              <LuExternalLink className="text-gray-400 hover:text-red-600"/>
                </Link>              
            </div>
          
            <div className='p-4 space-y-6 border border-gray-800'></div>
            
            <div className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <p onClick={()=>{setJustLoggedinadmin({}), 
           setLoader(true)
                    setTimeout(() => {
                      localStorage.removeItem('loggedin-admin');
                      router.push('/')
                      
                    }, 2000);}}
              className="font-sans text-[15px] flex items-center gap-2">Sign Out
                </p>              
            </div>
       
                            
          </article>
        </section>
        <section
          className="w-screen h-full cursor-pointer"
          onClick={() => setIsOpen(false)}
        ></section>
      </div>
    </div>  

    
          <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
          />   
    </div>
  )
}

export default Navadmin
