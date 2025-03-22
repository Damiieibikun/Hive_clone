'use client'

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { LiaSearchSolid } from "react-icons/lia";
import { MdOutlineModeEdit } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuExternalLink } from "react-icons/lu";
import LoginModal from "./LoginModal";
import { ApiContext } from "@/context/apiContext";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from "@/context/appContext";
import { useTheme } from "next-themes";
import {HiveButton} from "./HiveButton";



const Nav = () => {
  const [isVisible, setIsVisible] = useState(true); 
  const [lastScrollY, setLastScrollY] = useState(0); 
  const [isOpen, setIsOpen] = useState(false); 

  const {setLoader} = useContext(AppContext)

  const {login, setLogin, setJustLoggedin} = useContext(ApiContext);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const router = useRouter()
  
  const just_loggedin = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('loggedin-user')) : null

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
       
        setIsVisible(false);
      } else {
        
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY); 
    };

   
    window.addEventListener("scroll", handleScroll);

    return () => {
      
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const logOut = ()=>{
      setJustLoggedin({}), 
        setLoader(true)
        setTimeout(() => {
          localStorage.removeItem('loggedin-user');
          router.push('/')
          setLoader(false)
        }, 2000);
       
       }

  return (
    <div>
<nav className={`shadow-md bg-white dark:text-white dark:bg-[#2C3136] flex items-center pt-2 pb-1 px-3 justify-between font-sansRegularPro text-[18px] text-gray-700 fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    ><Link href='/' onClick={()=> setLoader(true)}>
    {theme === 'dark' ?  <Image
        src="https://hive.blog/images/hive-blog-logo-nightmode.svg"
        width={120}
        height={120}
        alt="logo"
        className="w-20 sm:w-32 md:w-40"
      />:  <Image
      src="https://hive.blog/images/hive-blog-logo.svg"
      width={120}
      height={120}
      alt="logo"
      className="w-20 sm:w-32 md:w-40"
    />}
    </Link>
     
      <ul className="hidden lg:flex items-center gap-6 ml-[100px] text-gray-600 dark:text-white">
        <li className="relative group">
          <Link
            href="/"
            onClick={()=> setLoader(true)}
            className="hover:text-[#E31337] transition-all duration-300 py-2 block"
          >
            Posts
          </Link>
          <span className="absolute bottom-[-10px] left-0 h-0 w-full bg-[#E31337] group-hover:h-[3px] hover:transition-all duration-100"></span>
        </li>
        <li className="relative group">
          <Link href={'https://wallet.hive.blog/proposals'} target="_blank" className="hover:text-[#E31337] transition-all duration-300 py-2 cursor-pointer">
            Proposals
          </Link>
          <span className="absolute bottom-[-10px] left-0 h-0 w-full bg-[#E31337] group-hover:h-[3px] hover:transition-all duration-100"></span>
        </li>
        <li className="relative group">
          <Link href={'https://wallet.hive.blog/~witnesses'}  target="_blank" className="hover:text-[#E31337] transition-all duration-300 py-2 cursor-pointer">
            Witnesses
          </Link>
          <span className="absolute bottom-[-10px] left-0 h-0 w-full bg-[#E31337] group-hover:h-[3px] hover:transition-all duration-100"></span>
        </li>
        <li className="relative group">
          <Link href={'https://hive.io/eco/'} target="_blank" className="hover:text-[#E31337] transition-all duration-300 py-2 cursor-pointer">
            Our dApps
          </Link>
          <span className="absolute bottom-[-10px] left-0 h-0 w-full bg-[#E31337] group-hover:h-[3px] hover:transition-all duration-100"></span>
        </li>
      </ul>
      <div className="flex items-center gap-3">
   
        {just_loggedin?.id ? <div className="flex flex-col gap-1 justify-center items-center">
        
          <Link href={`/users/${just_loggedin.id}`} onClick={()=> setLoader(true)} className="rounded-full border p-1 bg-[#F8F8F8] hover:cursor-pointer shadow-[3px_3px_0_rgba(220,38,38,1)] transition-all duration-300 hover:bg-[#E31337] hover:shadow-[6px_6px_0_rgba(31,35,38,1)]">
          {just_loggedin?.id && <div  className='rounded-full w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] text-center flex items-center justify-center 
          font-bold capitalize bg-black  text-white text-[11px] lg:text-[13px]'>{just_loggedin?.firstname[0]} {just_loggedin?.lastname[0]} </div>
          }
                    
          </Link>
        </div>
        
        :
        <p className="hover:cursor-pointer sm:block hidden dark:hover:text-[#E31337]" onClick={() => setLogin(true)}>Login</p>
        }      
        
        {just_loggedin?.id ? 
        <HiveButton
        func={logOut}
        caption={'Sign out'}
        styles={'hidden sm:block p-2 text-[13px]'}
        />:
        <Link
        href="/signup"
        onClick={()=> setLoader(true)}
        className="hidden sm:block p-2 bg-[#1F2326] dark:bg-white dark:text-[#1F2326] dark:hover:text-white text-white font-sansSemiBoldPro shadow-[3px_3px_0_rgba(220,38,38,1)] transition-all duration-300 dark:hover:bg-[#E31337] hover:bg-[#E31337] hover:shadow-[6px_6px_0_rgba(31,35,38,1)] dark:hover:shadow-[6px_6px_0_rgba(255,255,255,1)]"
      >
        Sign up
      </Link>}
        
        <div className="hidden rounded-full p-2 border border-gray-200 dark:border-white min-w-[240px] xl:flex items-center gap-3 text-[15px] text-gray-500">
          <LiaSearchSolid size={20} className="text-black dark:text-white" />
          Search
        </div>
        <div className="flex rounded-full p-2 border border-gray-200 xl:hidden items-center gap-3 text-[15px] text-gray-500">
          <LiaSearchSolid size={20} className="text-black dark:text-white" />
        </div>
        {just_loggedin?.id ? <Link href='/writepost' onClick={()=> {setLoader(true)}} className="rounded-full border border-gray-200 p-3 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:cursor-pointer hover:transition-all duration-500">
          <MdOutlineModeEdit size={20} />
        </Link>:
        <Link href='/loginerror' onClick={()=> setLoader(true)} className="rounded-full border border-gray-200 p-3 hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white hover:cursor-pointer hover:transition-all duration-500">
        <MdOutlineModeEdit size={20} />
      </Link>}
        
        <div onClick={() => setIsOpen(true)}>
          <RxHamburgerMenu size={20} className="hover:text-[#E31337] hover:cursor-pointer" />
        </div>
      </div>


 
    </nav>
           
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
              {just_loggedin?.id ? <p className="font-sans text-[15px]" onClick={logOut}>Sign Out</p> :<p className="font-sans text-[15px]" onClick={() => setLogin(true)}>Sign in</p>} 
            </div>
            <div className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <Link href='/signup' onClick={()=>  setLoader(true)} className="font-sans text-[15px] flex items-center gap-2">Sign Up
              
              </Link> 
            </div>
            </div>
           
           <div className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <p className="font-sans text-[15px]">Welcome</p> 
            </div>
            <div 
            onClick={()=> theme == "dark"? setTheme('light'): setTheme("dark")}
            className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <p className="font-sans text-[15px]">{theme == 'dark'? 'Light Mode' :'Night Mode'}</p> 
            </div>

           { just_loggedin?.id && <div className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <Link href={`/passwordchange/${just_loggedin.id}`} target="_blank" className="font-sans text-[15px] flex items-center gap-2">Change Accounts Password
              <LuExternalLink className="text-gray-400 hover:text-red-600"/>
                </Link>              
            </div>}


            <div className='p-4 space-y-6 border border-gray-800'></div>
           <div className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <Link href={'https://hive.blog/faq.html'}  target= '_blank' className="font-sans text-[15px] flex items-center gap-2">FAQs
              <LuExternalLink className="text-gray-400 hover:text-red-600"/>
                </Link>  
            </div>
           <div className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <Link href={'https://hiveblocks.com/'}  target= '_blank' className="font-sans text-[15px] flex items-center gap-2">Block Explorer
              <LuExternalLink className="text-gray-400 hover:text-red-600"/>
                </Link>              
            </div>          

           <div className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <Link href={'https://wallet.hive.blog/~witnesses'}  target= '_blank' className="font-sans text-[15px] flex items-center gap-2">Vote for Witnesses
              <LuExternalLink className="text-gray-400 hover:text-red-600"/>
                </Link>              
            </div>
           <div className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <Link href={'https://wallet.hive.blog/proposals'}  target= '_blank' className="font-sans text-[15px] flex items-center gap-2">Hive Proposals
              <LuExternalLink className="text-gray-400 hover:text-red-600"/>
                </Link>              
            </div>
          
            <div className='p-4 space-y-6 border border-gray-800'></div>
            <div className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <Link href={'https://developers.hive.io/'}  target= '_blank' className="font-sans text-[15px] flex items-center gap-2">Developer Portal
              <LuExternalLink className="text-gray-400 hover:text-red-600"/>
                </Link>              
            </div>
            <div className='p-3 space-y-6 border border-gray-800
            hover:bg-[#212529] transition-all duration-300 
            hover: cursor-pointer hover:border-b-red-600'>
              <Link href={'https://hive.io/whitepaper.pdf'}  target= '_blank' className="font-sans text-[15px] flex items-center gap-2">Hive White Paper
              <LuExternalLink className="text-gray-400 hover:text-red-600"/>
                </Link>              
            </div>                   
          </article>
        </section>
        <section
          className="w-screen h-full cursor-pointer"
          onClick={() => setIsOpen(false)}
        ></section>
      </div>
    </div>

  
    
     {login && (
      <LoginModal setLogin={setLogin}/>
      )}

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
   
  );
};

export default Nav;

