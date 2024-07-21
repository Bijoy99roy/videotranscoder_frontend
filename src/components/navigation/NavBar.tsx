import { MdVideoCall } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { SiGamejolt } from "react-icons/si";
import "../css/Icons.css"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext, useRef } from "react";
import axios from "axios";
import { HiUpload } from "react-icons/hi";


export function NavBar({isUploadPage=false, onUploadClick, handleChannel, onClickOpenProfile}:{isUploadPage?:boolean, onUploadClick?:() => void, handleChannel?:()=> void, onClickOpenProfile: React.Dispatch<React.SetStateAction<boolean>>}){

    const navigate = useNavigate()
    const { user } = useContext(AuthContext);


    return <>
    <div className="flex justify-between border-b-2 border-hidden my-2">
        <div className="flex flex-col justify-center ml-5 md:text-3xl font-mono cursor-pointer">
            <div className="flex" onClick={()=>navigate("/")}>
                <SiGamejolt  className="mx-auto text-red-500 mr-2 SiGamejolt"/>
                <div className="flex font-bold">
                    Nyx
                </div>
            </div>
        </div>
        <div className="flex mx-2">
            {(user && user.id) ?
                <div className="flex flex-col justify-center mr-5 border my-3 border-slate-300 px-3 cursor-pointer">
                    {isUploadPage ? 
                    <div className="flex" onClick={onUploadClick}>
                        <HiUpload className="mx-auto text-red-500 mr-2 MdVideoCall"/>

                        <div className="flex font-bold text-xs md:text-base">
                            Upload
                        </div>

                    </div>
                    :
                    <div className="flex" onClick={handleChannel}>
                        <MdVideoCall  className="mx-auto text-red-500 mr-2 MdVideoCall"/>

                        <div className="flex font-bold text-xs md:text-base">
                            Create
                        </div>
  
                    </div>
                    }
                   
                </div>
                :
                ""
            }
            
            <div className="flex flex-col items-center justify-center rounded-3xl px-2 py-2 bg-slate-100 my-2 cursor-pointer">
                {user ? 
                <div className="flex w-8 h-8 rounded-full" onClick={()=>{
                    onClickOpenProfile((prev)=>{
                        return !prev
                    })
                }}>
                    <img src={user.photo} alt="" className="rounded-full"/>
                </div>
               : 
               <a href="http://localhost:3000/api/v1/auth/google">
                <div className="flex">
                    <FaRegUserCircle  className="mx-auto text-blue-500 mr-2 FaRegUserCircle"/>
                    <div className="flex font-bold text-blue-500 text-xs md:text-base">
                         Sign In
                    </div>
                </div>
                </a>
                }
                
            </div>
            
        </div>
        
    </div>
    
    </>
}