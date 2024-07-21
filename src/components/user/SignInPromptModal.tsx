import { FaRegUserCircle } from "react-icons/fa";
import { Modal } from "../common/Modal";
import { useLocation } from "react-router-dom";

export function SignInPromptModal({isOpen=false, onClose}:{isOpen?:boolean, onClose?:()=>void}){
    const location = useLocation();

    return <>
    <Modal open={isOpen} onClose={onClose} enableClickEvents={true}>
        <div className="flex flex-col my-3 gap-y-3">
            <p className="font-semibold">SignIn to continue</p>
            <div className="flex">
            <a href="https://whole-adapted-mammoth.ngrok-free.app/api/v1/auth/google">
                <div className="flex px-2 py-1 bg-slate-100 rounded-2xl">
                    {/* <FaRegUserCircle  className="mx-auto text-blue-500 mr-2 FaRegUserCircle"/> */}
                    <div className="flex font-bold text-blue-500 text-xs md:text-base">
                         Sign In
                    </div>
                </div>
                </a>
            </div>
            
        </div>
    </Modal>
    </>
}