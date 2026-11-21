import React,{createContext,useContext,useEffect,useState} from 'react';
import {blogApi,type BlogUser} from '../lib/blogApi';
type AuthContextType={session:BlogUser|null;user:BlogUser|null;loading:boolean;refresh:()=>Promise<void>;logout:()=>Promise<void>};
const AuthContext=createContext<AuthContextType>({session:null,user:null,loading:true,refresh:async()=>{},logout:async()=>{}});
export const AuthProvider=({children}:{children:React.ReactNode})=>{
 const [user,setUser]=useState<BlogUser|null>(null),[loading,setLoading]=useState(true);
 const refresh=async()=>{try{setUser(await blogApi.session())}catch{setUser(null)}finally{setLoading(false)}};
 const logout=async()=>{await blogApi.logout();setUser(null)};
 useEffect(()=>{void refresh()},[]);
 return <AuthContext.Provider value={{session:user,user,loading,refresh,logout}}>{children}</AuthContext.Provider>;
};
export const useAuth=()=>useContext(AuthContext);
