'use client'
import { FullLoaders } from "@/components/Loaders";
import { AppContext } from "@/context/appContext";
import Link from "next/link";
import { useContext, useEffect } from "react";

export default function NotFound() {
  const {loader, setLoader} = useContext(AppContext) 

  useEffect(()=>{   
      setLoader(false)   
   
  }, [])

  console.log(loader)

  if (loader) return <FullLoaders/>
  return (
      <div className=" dark:text-white dark:bg-[#2C3136] flex flex-col gap-4 justify-center items-center min-h-[80vh] border p-3 max-w-[700px]  rounded-md mx-auto mt-8 shadow-[7px_7px_0_rgba(220,38,38,1)]">
          <h1 className="font-sansSemiBoldPro text-[40px]">404 - Not Found</h1>
          <p className="font-sansRegularPro">The page you are looking for does not exist.</p>
          <div className="mt-3">
        <Link href={"/"} onClick={()=>setLoader(true)} className="text-[18px] py-4 px-6 bg-[#1F2326] text-white font-sansSemiBoldPro shadow-[3px_3px_0_rgba(220,38,38,1)] transition-all duration-300 hover:bg-[#E31337] hover:shadow-[6px_6px_0_rgba(31,35,38,1)] dark:bg-white dark:text-[#1F2326] dark:hover:text-white dark:hover:bg-[#E31337] dark:hover:shadow-[6px_6px_0_rgba(255,255,255,1)]">Go back to Home</Link>
        
      </div>
      </div>
  );
}
