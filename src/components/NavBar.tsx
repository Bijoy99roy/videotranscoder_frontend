import { MdVideoCall } from "react-icons/md";
import { IoLogoYoutube } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { SiGamejolt } from "react-icons/si";
import "./Icons.css"
export function NavBar(){
    return <div className="flex justify-between border-b-2 border-hidden my-2">
        <div className="flex flex-col justify-center ml-5 md:text-3xl font-mono cursor-pointer">
            <div className="flex">
                <SiGamejolt  className="mx-auto text-red-500 mr-2 SiGamejolt"/>
                <div className="flex font-bold">
                    Steve
                </div>
            </div>
        </div>
        <div className="flex mx-2">
            
                <div className="flex flex-col justify-center mr-5 border my-3 border-slate-300 px-3 cursor-pointer">
                    <div className="flex">
                        <MdVideoCall  className="mx-auto text-red-500 mr-2 MdVideoCall"/>
                        <div className="flex font-bold text-xs md:text-base">
                            Create
                        </div>
                    </div>
                   
                </div>
            
            <div className="flex flex-col items-center justify-center rounded-3xl px-2 py-2 bg-slate-100 my-2 cursor-pointer">
                <div className="flex">
                    <FaRegUserCircle  className="mx-auto text-blue-500 mr-2 FaRegUserCircle"/>
                    <div className="flex font-bold text-blue-500 text-xs md:text-base">
                        Sign In
                    </div>
                </div>
            </div>
        </div>
        
    </div>
}