import { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";
import { PiHighDefinitionFill } from "react-icons/pi";
import { HiUpload } from "react-icons/hi";
import { Tooltip } from "@mui/material";
import { useWebSocket } from "../context/useSocketContext";
import { AuthContext } from "../context/authContext";
import { updateVideoDetails, uploadThumbnail } from "../services/uploadService";
import { getVideoInfo } from "../services/videos";
import { useAsyncFn } from "../hooks/useAsync";
import { useDebounce } from "../hooks/useDebounce";


export function VideoInfo({isOpen=false, onClose, videoInfo}:{isOpen?:boolean, onClose?:()=>void, videoInfo:any}){

    const { user, setUser, userData, setUserData } = useContext(AuthContext);
    const [title, setTitle] = useState<string>(videoInfo?.title)
    const [description, setDescription] = useState<string>(videoInfo?.description)
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const { messages, sendMessage } = useWebSocket();
    const [inputValue, setInputValue] = useState<string>('');
    const [processingStatus, setProcessingStatus] = useState("Video Processing")
    const [thumbnailUrl, setThumbnailUrl] = useState(videoInfo.thumbnailUrl)
    const {error:uploadThumbnailError, loading: uploadThumbnailLoading, value: uploadThumbnailValue, execute: uploadThumbnailFn} = useAsyncFn(uploadThumbnail)
    const {error:getVideoInfoError, loading: getVideoInfoLoading, value: getVideoInfoValue, execute: getVideoInfoFn} = useAsyncFn(getVideoInfo)
    const {error:updateVideoDetailsError, loading: updateVideoDetailsLoading, value: updateVideoDetailsValue, execute: updateVideoDetailsFn} = useAsyncFn(updateVideoDetails)
    const [saving, setSaving] = useState(false)
    const debounceDetails = useDebounce({
        title: title,
        description: description
    })
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const uploadResult = await uploadThumbnailFn(file, videoInfo.id)
            const videoInfoResult = await getVideoInfoFn(uploadResult.videoId);
            setThumbnailUrl(videoInfoResult.thumbnailUrl);
        }
    };

    useEffect(()=>{
        if (messages.length>0){
            const data =JSON.parse(messages[0])
            console.log(data)
            const status = data.status
            const thumbnail = data.thumbnailUrl
            setThumbnailUrl(thumbnail)
            setProcessingStatus(status=="Failed" ? "Video Processing Failed" : "Video Processed")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            console.log(`Websocket:  ${status}`)
        }
        
        const handleSend = () => {
            sendMessage(inputValue);
            setInputValue('');
        };
        console.log(user.id)
        if (videoInfo?.title){
            console.log("Connection send")
            const payload = {
                type: "register",
                userId: user.id,
                jobId: "something"
            }
            sendMessage(JSON.stringify(payload));
        }
    }, [messages])
    
    

    const adjustHeightDesc = () => {
      const textarea = descriptionRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    useEffect(() => {
      const textareaDesc = descriptionRef.current;
  
      if (textareaDesc) {
        adjustHeightDesc(); 
        const handleInputDesc = () => adjustHeightDesc();    
        textareaDesc.addEventListener('input', handleInputDesc);

        return () => {

            textareaDesc.removeEventListener('input', handleInputDesc);
        };
      }
    }, []);

    useEffect(() => {

            setSaving(true)
        console.log(updateVideoDetailsLoading)
        // console.log(debouncedSearch)

           updateVideoDetailsFn(videoInfo.id, title, description)
            .then((saved: boolean)=>{
                // console.log(`saved? ${saved}`)
                if (saved){
                    setTimeout(() => {
                        setSaving(false)
                    }, 500);
                    
                }
            })
            
        
        
        
      }, [title, description]);

    return <>
        <Modal open={isOpen} onClose={onClose} enableClickEvents={true}>
            <div className="flex flex-col justify-between my-5">
                <div className="flex gap-x-10">
                    <div className="flex flex-col gap-y-6">
                        <div className="flex flex-col">
                            <input 
                            onChange={(e)=>{
                                setTitle(e.target.value)
                            }}
                            value={title}
                            type="text" placeholder="Title (required)" className="resize-none w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden"/>
                        </div>
                        <div className="flex flex-col">
                            <textarea 
                            onChange={(e)=>{
                                setDescription(e.target.value)
                            }}
                            value={description}
                            ref={descriptionRef} placeholder="Description" className="resize-none w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden"/>
                        </div>

                        <div className="flex gap-x-2">
                            <span className="flex justify-center items-center text-sm bg-slate-200 py-5 w-32" onClick={handleClick}>upload thumbnail+</span>
                            <input type="file"ref={hiddenFileInput} onChange={handleFileChange} className="hidden" accept="image/*"/>
                            <img src={thumbnailUrl} alt="noImage" className="bg-slate-200 w-32 h-24"/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex h-36 w-60 bg-slate-300 justify-center items-center">
                            { thumbnailUrl ? 
                            <img src={thumbnailUrl} alt="noImage" className="h-36 w-60"/>
                            :
                            <span>Processing...</span>
                            }
                        </div>

                        <div className="flex flex-col w-60 bg-slate-700 text-white mt-1 pl-2">
                            <span className="text-xs">Video Link</span>
                            <a href="http://google.com">Google</a>
                            <span className="text-xs">File Name</span>
                            <span className="text-wrap">{title}</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-10">
                
                    <div className="flex gap-x-2">
                    <Tooltip title={processingStatus} placement="top" className="z-50">
                        <div>
                            <PiHighDefinitionFill size={24} className={`${processingStatus == "Video Processed" ? "text-blue-800" : "text-blue-800 animate-pulse"}`}/>
                        </div>
                        
                    </Tooltip>
                    <Tooltip title="Video Upload Complete" placement="top" className="z-50">
                    <div>
                        <HiUpload size={24} color="blue"/>
                    </div>
                    </Tooltip>
                    
                    {updateVideoDetailsLoading===true ? <span>Saving...</span> : <span>Saved</span>}
                    </div>
                    
                    <button className="px-4 py-1 rounded-md bg-blue-500 text-white">Submit</button>
                </div>
            </div>
        </Modal>
    </>
}