import { MdFileUpload } from "react-icons/md";
import "../css/Icons.css"
import { useRef } from "react";
import { uploadVideo } from "../../services/uploadService";


export function UploadButton({onClickHandle, onChangeHandle, refObject}:{onClickHandle?:()=>void, onChangeHandle?:(key:any)=>void, refObject?: any}){

    return <div className="flex flex-col">
        {/* <div className="flex"> */}
        <MdFileUpload className="MdFileUpload cursor-pointer" onClick={onClickHandle}/>
        {/* </div> */}
        {/* <span className="mb-2 ml-1 font-medium text-slate-500 sm:text-base text-xs">No Content Available</span> */}
        <button className="bg-blue-600 text-white rounded-md py-2 sm:text-base text-sm" onClick={onClickHandle}>Upload Videos</button>
        <input type="file"ref={refObject} onChange={onChangeHandle} className="hidden" accept="video/*"/>
    </div>
}