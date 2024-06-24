import { MdFileUpload } from "react-icons/md";
import "./Icons.css"
import { useRef } from "react";
import { uploadVideo } from "../services/uploadService";


export function UploadButton({onClickHandle, onChangeHandle, refObject}:{onClickHandle?:()=>void, onChangeHandle?:(key:any)=>void, refObject?: any}){
    //  const hiddenFileInput = useRef<HTMLInputElement>(null);

    // const handleClick = () => {
    //         if (hiddenFileInput.current) {
    //         hiddenFileInput.current.click();
    //         }
    //     }

    // const handleFileUpload = async (event:any) => {
    //     // get the selected file from the input
    //     const file = event.target.files[0];
    //     console.log(file.type)
    //     console.log(file.name)
    //     const response = await uploadVideo(file)
    //     if (response?.isUploaded){
    //         console.log(response.videoId)
    //         // if (onUploadSuccess) {
    //             onUploadSuccesss(response.videoId)
    //         // }
    //         if (onUploadComplete){
    //             onUploadComplete();
    //         }
            
    //     }
    //     // create a new FormData object and append the file to it
    //     // const formData = new FormData();
    //     }
    // const handleFileChange = (event:any) => {
    //     const file = event.target.files[0];
    //     onUpload(file);
    //     };
    return <div className="flex flex-col">
        {/* <div className="flex"> */}
        <MdFileUpload className="MdFileUpload cursor-pointer" onClick={onClickHandle}/>
        {/* </div> */}
        {/* <span className="mb-2 ml-1 font-medium text-slate-500 sm:text-base text-xs">No Content Available</span> */}
        <button className="bg-blue-600 text-white rounded-md py-2 sm:text-base text-sm" onClick={onClickHandle}>Upload Videos</button>
        <input type="file"ref={refObject} onChange={onChangeHandle} className="hidden"/>
    </div>
}