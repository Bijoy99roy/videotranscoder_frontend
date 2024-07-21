import { useNavigate } from "react-router-dom"
import { PiSignOutLight } from "react-icons/pi"
import { AiOutlineLike } from "react-icons/ai"
import { CiMemoPad } from "react-icons/ci"
import { logOut } from "../../services/userService"

export function ProfileDrowDown({hide=true}:{hide: boolean}){
    const navigate = useNavigate()
    return <>
    <div className={`${hide ? "hidden" : "visible"} flex shadow-xl dropDownProfile z-50 absolute top-16 right-1 w-[200px] bg-white rounded-lg p-3 border-solid`}>
        <ul className="flex flex-col gap-2 cursor-pointer w-full">
            <li className="hover:bg-slate-100 rounded-sm px-1 py-2" onClick={()=>{
                navigate("/subscriptions")

            }}>
                 <label className="flex gap-2"><CiMemoPad className="mt-1" size={20}/> Subscriptions</label>
            </li>
            <li className="hover:bg-slate-100 rounded-sm px-1 py-2" onClick={()=>{
                navigate("/liked-videos")

            }}>
                <label className="flex gap-2"><AiOutlineLike className="mt-1" size={20}/> Liked Videos</label>
                
            </li>

            <li className="hover:bg-slate-100 rounded-sm px-1 py-2" onClick={()=>{
                logOut().then(()=>{
                    window.location.replace("/");
                })

            }}>
                <label className="flex gap-2"><PiSignOutLight className="mt-1" size={20}/> Sign Out</label>
                
            </li>
        </ul>
    </div>
    </>
}