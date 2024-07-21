import { RefObject } from "react";
import { Modal } from "../common/Modal";
import { UploadButton } from "./UploadButton";
import LinearWithValueLabel from "../loaders/LinearProgressWithLabel";

export function UploadModal({isOpen=false, onClose, onClickHandle, onChangeHandle, refObject, uploadProgress}:{isOpen?:boolean, onClose?:()=>void, onChangeHandle?:(event: any)=>void, onClickHandle?:()=>void, refObject?:RefObject<HTMLInputElement>, uploadProgress: number}){
    
    return <>
        <Modal open={isOpen} onClose={onClose} enableClickEvents={true} disableX={uploadProgress>=0}>
            {/* <div> */}
                <div className="flex sm:w-96 w-64 sm:h-96 h-60 justify-center items-center">
                    {uploadProgress>=0 ? <div className="w-full space-y-5">
                        <span className="flex sm:text-3xl text-xl px-4 py-2 font-semibold justify-center text-center">Upload Progress</span>
                        <LinearWithValueLabel progressValue={uploadProgress}/>
                        
                        </div> : <UploadButton onClickHandle={onClickHandle} onChangeHandle={onChangeHandle} refObject={refObject}/>}
                    {/* {loading && <p>Uploading...</p>}
                    {error && <p>Error: {error}</p>} */}
                </div>
            {/* </div> */}
            
            
        </Modal>
    </>
}