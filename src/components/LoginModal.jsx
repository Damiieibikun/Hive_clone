'use client'
import { ApiContext } from '@/context/apiContext'
import { AppContext } from '@/context/appContext'
import React, { useContext, useEffect } from 'react'
import {HiveButton} from './HiveButton'
import { MiniLoader } from './Loaders'


const LoginModal = ({setLogin}) => {
    const {login_inputs, handleLoginInputs, handleLoginSubmit} = useContext(AppContext)
    const{login_err, ToastContainer, Bounce,  setLoginLoader, logginin} = useContext(ApiContext)

useEffect(()=>{
  setLoginLoader(false)
}, [])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
          
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-[90]"
            onClick={() => setLogin(false)}
          ></div>

         
         
          <div
            className="relative bg-white dark:bg-[#2C3136] dark:text-white rounded-tr-3xl rounded-bl-3xl shadow-[7px_7px_0_rgba(220,38,38,1)] max-w-[600px] w-full max-h-[90vh] overflow-y-auto pt-12 pb-8 px-[70px] z-[100]"
          >
            
            <header className="flex justify-between items-center pb-4">
              <h2 className="font-sans font-[400] text-[20px] lg:text-[30px] text-gray-800 dark:text-white">Returning Users: Login</h2>              
            </header>

            <form action="" onSubmit={handleLoginSubmit}>
                    {/* Modal body */}
                    {login_err && <p className='text-[#E31337] text-sm font-sansRegularPro'>{login_err.error}</p>}
                    <div className="py-4 space-y-5">
              <div className="dark:bg-white flex items-center border rounded-l-md font-sansRegularPro">
                <div className="py-3 px-4 bg-[#e6e6e6] border border-gray-300 rounded-l-sm text-[12px] lg:text-[16px] text-gray-700">@</div>
                <input onChange={handleLoginInputs} value={login_inputs.username} name='username' type="text" placeholder="Enter your username" required  className="p-2 placeholder:text-[12px] lg:placeholder:text-[16px] w-full dark:bg-white dark:text-black"/>
              </div>
              <div className="flex items-center border rounded-md font-sansRegularPro dark:bg-white">                
                <input onChange={handleLoginInputs} value={login_inputs.password} name='password' type="password" placeholder="Password or Wif" required  className="p-2 placeholder:text-[12px] lg:placeholder:text-[16px] rounded-md w-full dark:bg-white dark:text-black" />
              </div>

              <div className="flex items-center gap-3 font-sansRegularPro text-[12px] lg:text-[14px] text-gray-800">
                <input type="checkbox" name="" id="" />
                <p className='dark:text-white'>Keep me logged in</p>
              </div>   

              <div className="flex items-center justify-between font-sansRegularPro">
                <HiveButton
                styles={'text-[16px] lg:text-[18px] py-4 px-6'}
                btnaction={'submit'}
                caption={'Login'}
                />

              <button type="button" className="py-4 px-6 text-gray-500 hover:text-[#E31337] transition-all duration-300 text-[16px] lg:text-[18px]" onClick={() => setLogin(false)}>Cancel</button>  
              </div>           
            </div>
          </form>

          <div className='flex justify-center h-[70px]'>
          {logginin &&  <MiniLoader/>  } 
              </div>
              
           
          </div>

          <ToastContainer
              position="top-center"
              autoClose={5000}
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

export default LoginModal
