'use client'
import { MiniLoader } from '@/components/Loaders'
import LoginModal from '@/components/LoginModal'
import { ApiContext } from '@/context/apiContext'
import { AppContext } from '@/context/appContext'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme; 
  const {login, setLogin, del_Msg, setDelMsg, ToastContainer, Bounce, 
    reg_loader, showOtpField, otp_loader, handleOTPSubmit } = useContext(ApiContext)


  const loggedin_user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('loggedin-user')) : null
  const editing_user = typeof window !== "undefined" ? localStorage.getItem('editing-user-hive') : null

  const{register_inputs, setRegisterInputs, handleRegisterInputs, 
    handleRegisterSubmit, password_err, 
    handleFileChange, avatar, banner, field_errors, handleOTP, otp} = useContext(AppContext)
 
     const [timeLeft, setTimeLeft] = useState(3 * 60); 
  const [displayMsg, setDisplayMsg] = useState(false)
    const showMsg = ()=>{
      setDisplayMsg(true)
      setTimeout(() => {
        setDisplayMsg(false);
        setDelMsg('');      
        
      }, 2000);   
    }
    
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    useEffect(()=>{
      if(editing_user && editing_user === loggedin_user?.id){
        setRegisterInputs((prev)=>({
          ...prev,
          user_id: loggedin_user?.id,
          firstname: loggedin_user?.firstname,
          lastname: loggedin_user?.lastname,
          username: loggedin_user?.username,
          descp: loggedin_user?.descp,
          email: loggedin_user?.email,
        }))
      }
    }, [])

    useEffect(() => {
      if (!showOtpField) return;
  
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
  
      return () => clearInterval(interval); 
    }, [showOtpField]);
    
   
  return (
    <div className='mb-5'>
        <div className="fixed top-0 bottom-0 right-0 left-0 sm:left-[unset] h-[100vw] sm:rotate-90 pointer-events-none select-none -z-10">
        <div className="relative w-screen h-[208px] overflow-hidden">
            <div className="hidden md:flex flex-1 flex-col whitespace-nowrap motion-safe:animate-marquee">
                <div className="text-[144px] font-black font-display leading-[0.775] text-gray-200">INLEOINLEOINLEOINLEOINLEOINLEOINLEOINLEOINLEOINLEOINLEOINLEOINLEOINLEOINLEOINLEO</div>
            </div>
                <div className="hidden md:flex flex-1 flex-col whitespace-nowrap motion-safe:animate-marquee-reverse">
                    <div className="text-[144px] font-black font-display leading-[0.78] text-gray-200 -translate-x-[360px]">INLEOINLEOINLEOINLEOINLEOINLEOINLEOINLEOINLEOINLEOINLEOINLEOINLEOINLEOINLEOINLEO</div>
                </div>
        </div>
      </div>
        <Link href='/'>
        <svg xmlns="http://www.w3.org/2000/svg" height="70" width="150" viewBox="0 0 835 190" className="logo footer__logo p-4">
              <g fill="none">
                <g className="logo__icon">
                  <path fill='#e31337' d="M157.272625,107.263942 C157.998992,107.263942 158.45262,108.051463 158.088736,108.68075 L111.33839,189.528945 C111.169808,189.820485 110.858795,190 110.522279,190 L81.9443812,190 C81.2180145,190 80.764386,189.212478 81.1282705,188.583191 L127.878616,107.734996 C128.047199,107.443456 128.358211,107.263942 128.694727,107.263942 L157.272625,107.263942 Z M129.477721,84.0901367 C129.141205,84.0901367 128.830192,83.9106218 128.66161,83.6190818 L81.1282705,1.41680884 C80.764386,0.787521511 81.2180145,0 81.9443812,0 L110.522279,0 C110.858795,0 111.169808,0.179514873 111.33839,0.471054898 L158.87173,82.6733278 C159.235614,83.3026152 158.781986,84.0901367 158.055619,84.0901367 L129.477721,84.0901367 Z"></path>
                  <path fill= '#e31337' d="M135.128406 1.41635199C134.76385.787064228 135.218932 0 135.947343 0L164.565951 0C164.903712 0 165.215845.179714185 165.384888.47151174L219.873006 94.5275799C220.042331 94.8198642 220.042331 95.1801358 219.873006 95.4724201L165.384888 189.528488C165.215845 189.820286 164.903712 190 164.565951 190L135.947343 190C135.218932 190 134.76385 189.212936 135.128406 188.583648L189.342845 95 135.128406 1.41635199zM111.870216 94.5240823C112.042446 94.816752 112.043313 95.1785591 111.872487 95.4720377L57.1252257 189.528106C56.7599958 190.155572 55.8478414 190.157723 55.4796094 189.531986L.129783614 95.4759177C-.0424457704 95.183248-.0433125021 94.8214409.127512727 94.5279623L54.8747743.471894257C55.2400042-.15557243 56.1521586-.157723129 56.5203906.468014185L111.870216 94.5240823z"></path>
                </g>
                <path fillRule="nonzero" d="M371.507904,36 L403.108995,36 L403.108995,152.798507 L371.507904,152.798507 L371.507904,107.24709 L326.601091,107.24709 L326.601091,152.798507 L295,152.798507 L295,36 L326.601091,36 L326.601091,78.2143177 L371.507904,78.2143177 L371.507904,36 Z M469.637608,36 L500.822895,36 L500.822895,152.798507 L469.637608,152.798507 L469.637608,36 Z M602.709958,152.798507 L556.956412,37.5016951 L556.956412,36 L591.229977,36 L619.846741,115.25613 L648.463504,36 L682.73707,36 L682.73707,37.5016951 L636.983523,152.798507 L602.709958,152.798507 Z M769.500274,124.099446 L834.505467,124.099446 L834.505467,152.798507 L737.831077,152.798507 L737.831077,36 L833.338707,36 L833.338707,64.6990618 L769.500274,64.6990618 L769.500274,80.8839979 L810.003509,80.8839979 L810.003509,107.5808 L769.500274,107.5808 L769.500274,124.099446 Z" className="logo__text fill-black dark:fill-white"></path>
              </g>
            </svg>
        </Link>
      

      <div className='w-[70%] mx-auto'>
    
     <p className='font-sans text-[44px] font-[600] text-[#212529] dark:text-white'> {editing_user ? 'Update':'Register'}</p>
     

<form className="max-w-sm mt-8" onSubmit={handleRegisterSubmit}>
<p className='text-red-600 font-sansSemiBoldPro text-xs'>{field_errors}</p>
  <div className="mb-5">
    <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your First Name</label>
    <input onChange={handleRegisterInputs} name='firstname' value={register_inputs.firstname} 
    className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
     block w-full p-2.5 ${field_errors && !register_inputs.firstname ? 'ring-2 ring-[#E31337] outline-none' : ''}`} 
    
    />
  </div>
  <div className="mb-5">
    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Last Name</label>
    <input onChange={handleRegisterInputs} name='lastname' value={register_inputs.lastname} 
    className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
    rounded-lg focus:ring-[#E31337] focus:border-[#E31337] block w-full p-2.5 ${field_errors && !register_inputs.lastname ? 'ring-2 ring-[#E31337] outline-none' : ''}`} 
    
     />
  </div>
  <div className="mb-5">
    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
    <input onChange={handleRegisterInputs} name='username' value={register_inputs.username}
    className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
    text-sm rounded-lg focus:ring-[#E31337] focus:border-[#E31337] block w-full p-2.5 ${field_errors && !register_inputs.username ? 'ring-2 ring-[#E31337] outline-none' : ''}`} 
    
    />
  </div> 
  {editing_user ? null:<div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input onChange={handleRegisterInputs} name='email' value={register_inputs.email} type="email" 
    className={`shadow-sm bg-gray-50 border border-gray-300
     text-gray-900 text-sm rounded-lg focus:ring-[#E31337] focus:border-[#E31337] block 
     w-full p-2.5 ${field_errors && !register_inputs.email ? 'ring-2 ring-[#E31337] outline-none' : ''}`}
     placeholder="name@gmail.com" 
    
     />
  </div> }
  <div className="mb-5">
    <label htmlFor="descp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About Me</label>
    <textarea onChange={handleRegisterInputs} name='descp' value={register_inputs.descp} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#E31337] focus:border-[#E31337] block w-full p-2.5 h-[100px]"></textarea>
  </div>

  
  <div className="mb-7">
  {avatar && <p className='my-1 p-2 bg-slate-50 border'>{avatar.name}</p>}
    <label htmlFor="avatar" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Upload Profile Picture (Optional) <span className='text-[10px] text-gray-700 dark:text-gray-500'>format: jpg, jpeg, webp, gif, svg **5MB or less</span></label>
    <label htmlFor="avatar" className="w-fit p-2 bg-[#1F2326] text-white font-sansSemiBoldPro shadow-[2px_1px_0_rgba(220,38,38,1)] transition-all duration-300 hover:bg-[#E31337] hover:shadow-[3px_2px_0_rgba(31,35,38,1)] hover:cursor-pointer dark:bg-white dark:text-[#1F2326] dark:hover:text-white dark:hover:bg-[#E31337] dark:hover:shadow-[6px_6px_0_rgba(255,255,255,1)]">
                    Choose Files
                </label>
    <input onChange={handleFileChange} name='avatar' id='avatar' type="file" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#E31337] focus:border-[#E31337] w-full p-2.5 hidden" />
  </div>
  <div className="mb-7">
   {banner && <p className='my-1 p-2 bg-slate-50 border'>{banner.name}</p>}
    <label htmlFor="banner" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Upload Banner Picture (Optional) <span className='text-[10px] text-gray-700 dark:text-gray-500'>format: jpg, jpeg, webp, gif, svg **5MB or less</span></label>
    <label htmlFor="banner" className="w-fit p-2 bg-[#1F2326] text-white font-sansSemiBoldPro shadow-[2px_1px_0_rgba(220,38,38,1)] transition-all duration-300 hover:bg-[#E31337] hover:shadow-[3px_2px_0_rgba(31,35,38,1)] hover:cursor-pointer dark:bg-white dark:text-[#1F2326] dark:hover:text-white dark:hover:bg-[#E31337] dark:hover:shadow-[6px_6px_0_rgba(255,255,255,1)]">
                    Choose Files
                </label>
    <input onChange={handleFileChange} name='banner' id='banner'  type="file" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#E31337] focus:border-[#E31337] w-full p-2.5 hidden" />
  </div>
    {editing_user ? null: <div>
      
      {password_err && <p className='text-xs font-medium text-red-600'>{password_err.password_length}</p>}
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input onChange={handleRegisterInputs} name='password' value={register_inputs.password} type="password" 
    className={`shadow-sm bg-gray-50 border border-gray-300
     text-gray-900 text-sm rounded-lg focus:ring-[#E31337] 
     focus:border-[#E31337] block w-full p-2.5 ${field_errors && !register_inputs.password || password_err.password_length? 'ring-2 ring-[#E31337] outline-none' : ''}`} 
    
      />
  </div>
  {password_err && <p className='text-xs font-medium text-red-600'>{password_err.password_err}</p>}
  <div className="mb-5">
    <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
    <input onChange={handleRegisterInputs} name='confirm_password' value={register_inputs.confirm_password} type="password" 
    className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
     focus:ring-[#E31337] focus:border-[#E31337] block w-full p-2.5 ${password_err.password_err ? 'ring-2 ring-[#E31337] outline-none' : ''}`}
      
      />
  </div> 
  
{showOtpField ? <div className="mb-5">
  <div className='flex items-end gap-4'>
  <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP</label>
  <span className='dark:text-white text-xs mb-2 text-gray-700'>{formatTime(timeLeft)}</span>
  </div>
   
    <input onChange={handleOTP} name='otp' type="text" 
    className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
     focus:ring-[#E31337] focus:border-[#E31337] block w-full p-2.5 ${password_err.password_err ? 'ring-2 ring-[#E31337] outline-none' : ''}`}
      
      />
  </div> : null }
  
      </div>}

      
 {showOtpField  ? <button onClick={()=>{handleOTPSubmit(register_inputs.email, otp)}} type="button" className="py-2 px-5 border hover:bg-[#EEEEEE] dark:text-white dark:hover:text-gray-900 dark:hover:border-[#E31337] font-medium rounded-full text-sm text-center transition-all duration-200 flex gap-5 items-center justify-center">
  <Image src='https://inleo.io/build/_assets/hive-AIJIRDAR.svg' width={30} height={30} alt='logo'/>
    <p className='font-sans font-[600] text-[15px]'>Create hive account</p>    
</button>:<button onClick={()=>{showMsg()}} type="submit" className="py-2 px-5 border hover:bg-[#EEEEEE] dark:text-white dark:hover:text-gray-900 dark:hover:border-[#E31337] font-medium rounded-full text-sm text-center transition-all duration-200 flex gap-5 items-center justify-center">
  <Image src='https://inleo.io/build/_assets/hive-AIJIRDAR.svg' width={30} height={30} alt='logo'/>
    <p className='font-sans font-[600] text-[15px]'>{editing_user? 'Edit hive details':'Submit'}</p>    
</button>}

{otp_loader && <p className='dark:text-white my-3 text-sm text-gray-600 font-sansRegularPro'>{otp_loader}</p>}
<div className='ml-[20%] h-[70px]'>
{reg_loader && <MiniLoader/>}
</div>

</form>

<p className='font-sansSemiBoldPro font-[700] mb-5 text-[17px] dark:text-white'>Already have an account?</p>
<button onClick={() => setLogin(true)} className="focus:ring-2 border dark:text-white dark:border-white dark:hover:text-gray-900 dark:hover:border-[#E31337] border-[#E31337] focus:outline-none focus:ring-[#E31337] px-9 py-2 hover:bg-[#FEF1EE] font-medium rounded-full text-sm text-center transition-all duration-200 text-[#F44727]">Sign In</button>
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
  )
}

export default page
