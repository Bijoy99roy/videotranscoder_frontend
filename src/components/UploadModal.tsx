import { RefObject, useState } from "react";
import { Modal } from "./Modal";
import { UploadButton } from "./UploadButton";
import { uploadVideo } from "../services/uploadService";

export function UploadModal({isOpen=false, onClose, onClickHandle, onChangeHandle, refObject}:{isOpen?:boolean, onClose?:()=>void, onChangeHandle?:(event: any)=>void, onClickHandle?:()=>void, refObject?:RefObject<HTMLInputElement>}){
    
    return <>
        <Modal open={isOpen} onClose={onClose} enableClickEvents={true}>
            {/* <div> */}
                <div className="flex w-96 h-96 justify-center items-center">
                    <UploadButton onClickHandle={onClickHandle} onChangeHandle={onChangeHandle} refObject={refObject}/>
                    {/* {loading && <p>Uploading...</p>}
                    {error && <p>Error: {error}</p>} */}
                </div>
            {/* </div> */}
            
            
        </Modal>
    </>
}