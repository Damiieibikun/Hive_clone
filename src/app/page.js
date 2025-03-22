'use client'
import HomePage from "@/components/HomePage";
import { FullLoaders } from "@/components/Loaders";
import Nav from "@/components/Nav";
import { ApiContext } from "@/context/apiContext";
import { useContext, useEffect, useState } from "react";

export default function Home() {
      const [loading, setLoading] = useState(true);
       const [just_loggedin, setJustLoggedin] = useState(null)
       const {login_loader, setLoginLoader} = useContext(ApiContext)

      useEffect(()=>{
        setLoginLoader(false)
        const storedUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('loggedin-user') || 'null') : null;
        setJustLoggedin(storedUser);
        setLoading(false);
      }, [login_loader])

  if (login_loader) return <FullLoaders/>
      return (
   <div>
    <Nav/>
  <HomePage just_loggedin = {just_loggedin}/>
   </div>
  );
}
