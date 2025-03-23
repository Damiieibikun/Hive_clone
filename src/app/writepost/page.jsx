'use client'
import {HiveButton} from '@/components/HiveButton'
import { FullLoaders, MiniLoader } from '@/components/Loaders'
import Nav from '@/components/Nav'
import { ApiContext } from '@/context/apiContext'
import { AppContext } from '@/context/appContext'
import React, { useContext, useEffect } from 'react'

const page = () => {
    const {post_inputs,
        handlePostInputs,
        handleImagesInput,
        removeImage,
        handleTagInput,
        removeTag,
        handlePostSubmit, field_errors} = useContext(AppContext);

    const {fetchAllCategories, all_categories, creating_post} = useContext(ApiContext);
const {loader, setLoader} = useContext(AppContext)

    useEffect(()=>{
      setLoader(false)
        fetchAllCategories();
    }, [])

 

  if (loader) return <FullLoaders/>


  return (
    <>
    <Nav/>
    <div className="mt-[80px] min-h-screen max-w-[700px] dark:border-none bg-white dark:bg-[#2C3136] dark:text-white min-w-[320px] p-10 rounded-lg border shadow-md mb-10 mx-auto transition-all">   
  <form action="" onSubmit={handlePostSubmit} className="space-y-6">
    <p className='text-red-600 font-sansSemiBoldPro text-xs'>{field_errors}</p>
    
    <div className="flex flex-col gap-2">
     
      <label
        htmlFor="category"
        className="text-lg text-gray-600 dark:text-white font-sansSemiBoldPro"
      >
        Category:
      </label>
      <select
        onChange={handlePostInputs}
        value={post_inputs.category}
        name="category"
        id="category"
        className={`capitalize dark:border-none dark:bg-[#212529] p-3 border
         border-gray-300 rounded-md text-md text-gray-700 dark:text-gray-400 
         font-sansRegularPro transition-all ${field_errors && !post_inputs.category ? 'ring-2 ring-[#E31337] outline-none' : ''}`}
      
      >
        <option value="">Select a Category</option>
        {all_categories.map((category) => {
          const { _id, name } = category;
          return (
            <option key={_id} value={_id}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
    <div className="flex flex-col gap-4">
      <label
        htmlFor="title"
        className="text-lg text-gray-600 dark:text-white font-sansSemiBoldPro"
      >
        Title:
      </label>
      <input
        onChange={handlePostInputs}
        value={post_inputs.title}
        type="text"
        name="title"
        id="title"
        className={`w-full dark:bg-[#212529] dark:border-none p-3 border
          border-gray-300 rounded-md transition-all ${field_errors && !post_inputs.title ? 'ring-2 ring-[#E31337] outline-none': ''}`}
        placeholder="Enter your post title"
        
      />
    </div>
    <div className="flex flex-col gap-4">
      <label
        htmlFor="content"
        className="text-lg text-gray-600 dark:text-white font-sansSemiBoldPro"
      >
        Content:
      </label>
      <textarea
        onChange={handlePostInputs}
        value={post_inputs.content}
        name="content"
        id="content"
        className={`w-full dark:bg-[#212529] dark:border-none p-3 border
           border-gray-300 rounded-md min-h-[50vh] resize-none
            transition-all ${field_errors && !post_inputs.content ? 'ring-2 ring-[#E31337] outline-none': ''}`}
        placeholder="Compose..."
   
      ></textarea>
    </div>
    <div className='flex items-center flex-wrap gap-5 justify-center md:justify-start'>
      {post_inputs.images?.map((file, idx) => (
         <div key={idx} className="relative w-32 h-32 overflow-hidden rounded-lg border">
         <img
           src={URL.createObjectURL(file)}
           alt={`Selected Preview ${idx}`}
           className="w-full h-full object-cover"
         />
          <button
            onClick={() => removeImage(idx)}
            type="button"
            className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm shadow-md transition-transform transform hover:scale-110"
          >
            ×
          </button>
        </div>
      ))}
 
    </div>
    <div className="flex flex-col gap-4">
      <div>
      <label
        htmlFor="images"
        className="text-lg text-gray-600 dark:text-white font-sansSemiBoldPro"
      >
        Upload Images (Max 3 images)
       
      </label>
      <br />
      <span className='text-[10px] text-gray-700 dark:text-gray-500'>  format: jpg, jpeg, webp, gif, svg  **5MB or less</span>
      </div>
     
      <label
        htmlFor="images"
        className="w-fit hover:cursor-pointer p-3 bg-[#1F2326] dark:bg-white dark:text-[#1F2326] dark:hover:text-white text-white font-sansSemiBoldPro shadow-[3px_3px_0_rgba(220,38,38,1)] transition-all duration-300 dark:hover:bg-[#E31337] hover:bg-[#E31337] hover:shadow-[6px_6px_0_rgba(31,35,38,1)] dark:hover:shadow-[6px_6px_0_rgba(255,255,255,1)]"
      >
        Choose Files
      </label>
      <input
        onChange={handleImagesInput}
        type="file"
        name="images"
        id="images"
        className="hidden"
      />
    </div>
    <div className="flex flex-col gap-4 max-w-[350px]">
      <label
        htmlFor="tags"
        className="text-lg text-gray-600 dark:text-white font-sansSemiBoldPro"
      >
        Tags:
      </label>
      <div className="flex flex-wrap gap-2">
        {post_inputs.tags?.map((tag, idx) => (
          <div
            key={idx}
            className="relative dark:bg-[#212529] dark:border-none dark:text-white bg-[#F8F8F8] border border-gray-300 rounded-md px-3 py-1 text-gray-700 flex items-center gap-2 hover:bg-[#F4F4FD] transition-all"
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
      <div className="flex items-center gap-3">
        <input
          type="text"
          id="tags"
          name="tags"
          className="p-3 dark:bg-[#212529] dark:border-none border border-gray-300 rounded-md flex-grow focus:ring-2 focus:ring-[#E31337] focus:outline-none transition-all"
          placeholder="Add a tag"
        />
         <HiveButton
       styles={'p-3'}
       caption={'Add tag'}
       func={handleTagInput}
       btnaction={'button'}
       />
      </div>
    </div>
    <div className="flex flex-col justify-end items-end mt-5">
    <HiveButton
       styles={'p-3'}
       caption={'Create Post'}
       btnaction={'submit'}
       />
       <div className='h-[70px]'>
       {creating_post && <MiniLoader/>}
       </div>
       
    </div>
  </form>
</div>
    </>
        
  )
}

export default page
