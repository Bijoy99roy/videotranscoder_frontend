import { MdVideoCall } from "react-icons/md";
import { IoLogoYoutube } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";

export function NavBar(){
    return <div className="flex justify-between border-b-2 border-hidden my-2">
        <div className="flex flex-col justify-center ml-5 text-3xl font-mono cursor-pointer">
            <div className="flex">
                <IoLogoYoutube size={36}  className="mx-auto text-red-500 mr-2"/>
                <div className="flex font-bold">
                    Steve
                </div>
            </div>
        </div>
        <div className="flex mx-2">
            
                <div className="flex flex-col justify-center mr-5 border my-3 border-slate-300 px-3 cursor-pointer">
                    <div className="flex">
                        <MdVideoCall size={26} className="mx-auto text-red-500 mr-2"/>
                        <div className="flex font-bold">
                            Create
                        </div>
                    </div>
                   
                </div>
            
            <div className="flex flex-col items-center justify-center rounded-2xl pr-3 py-2 bg-slate-100 my-2 cursor-pointer">
                <div className="flex">
                    <FaRegUserCircle size={24}  className="mx-auto text-blue-500 mr-2"/>
                    <div className="flex font-bold text-blue-500">
                        Sign In
                    </div>
                </div>
            </div>
        </div>
        
    </div>
}