'use client'
import { ApiContext } from '@/context/apiContext'
import { AppContext } from '@/context/appContext'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

const CategoryOverview = ({cat_id, className, posts}) => {
    const{fetchCategoriesByID, selectedCat} = useContext(ApiContext)
    const {loader, setLoader} = useContext(AppContext)
    const [posts_byCat, setPostsbyCat] = useState([])
    
    const just_loggedin = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('loggedin-user')) : null
  useEffect(() => {
    setLoader(false)
    const fetchDataAndFilter = async () => {
      await fetchCategoriesByID(cat_id);
      if (posts && posts.length > 0) {
        const filteredPosts = posts.filter((post) => post.category === cat_id);
        setPostsbyCat(filteredPosts);
      }
    };

    fetchDataAndFilter();
  }, [cat_id, posts]); 

  console.log(selectedCat)

  return (
    <>
   { selectedCat &&  <div className={`flex flex-col gap-5 justify-center items-center md:justify-between md:flex-row xl:flex-col bg-white dark:bg-[#2C3136] dark:text-white dark:border-none rounded-md max-h-[400px] ${className}`}>
       <div>
       <p className='text-center md:text-left font-sansSemiBoldPro capitalize text-[20px]'>{selectedCat.name}</p>
       <p className='text-[13px] font-sansRegularPro text-gray-500'>{posts_byCat?.length} posts</p>
       <p className='text-center md:text-left font-sansRegularPro text-[14px] capitalize'>{selectedCat.descp}</p>
       </div>       

       <div className='flex md:flex-col justify-center gap-3 min-w-[200px]'>
        <button className='uppercase py-2 px-4 text-white bg-[#005799] hover:bg-[#15407A] font-sansRegularPro text-[14px] rounded-sm' >Subscribe</button>
       {just_loggedin?.id ? <Link href='/writepost' onClick={()=> setLoader(true)} className='uppercase py-2 px-4 text-white bg-[#005799] hover:bg-[#15407A] font-sansRegularPro text-[14px] rounded-sm text-center' >Post</Link>:
       <Link href='/loginerror' className='uppercase py-2 px-4 text-white bg-[#005799] hover:bg-[#15407A] font-sansRegularPro text-[14px] rounded-sm text-center'>Post</Link>}
       
       </div>
    </div> 
    }  
  </>
  )
}

export default CategoryOverview
