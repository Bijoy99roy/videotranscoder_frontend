import { useEffect } from "react";
import { LiaTimesSolid } from "react-icons/lia";

export function Modal({open, onClose, children, enableClickEvents, disableX=false}:{open: any, onClose:any, children:any, enableClickEvents:boolean, disableX?:boolean}){
    return <div className={`
    fixed inset-0 justify-center items-center transition-colors z-10 flex
    ${open ? "bg-black/50 h-full w-full" : "invisible"} ${enableClickEvents ? "pointer-events-auto" : "pointer-events-none"}`}
    >

        <div className={`
        bg-white rounded-lg shadow p-6 transition-all ease-in duration-350
        ${open ? "scale-100 opacity-100": "scale-125 opacity-0"}`}
        >
            
            <button onClick={onClose}
            className={` absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 ${disableX ? "hidden" : "visible"}`}>
                <LiaTimesSolid />
            </button>
            {children}
        </div>
    </div>
}