import { useEffect, useRef, useState } from "react";
import { Modal } from "../common/Modal";
import { PiHighDefinitionFill } from "react-icons/pi";
import { HiUpload } from "react-icons/hi";
import { Tooltip } from "@mui/material";
import { useWebSocket } from "../../context/useSocketContext";
import { publishVideo, updateVideoDetails, uploadThumbnail } from "../../services/uploadService";
import { getVideoInfo } from "../../services/videosService";
import { useAsyncFn } from "../../hooks/useAsync";
import { useDebounce } from "../../hooks/useDebounce";


export function VideoInfo({isOpen=false, onClose, videoInfo}:{isOpen?:boolean, onClose?:()=>void, videoInfo:any}){
    if (!videoInfo.videoQueue) return


    const [title, setTitle] = useState<string>(videoInfo?.title)
    const [description, setDescription] = useState<string>(videoInfo?.description)
    const [titleError, setTitleError] = useState<string>()
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false)
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const { messages } = useWebSocket();
    const [processingStatus, setProcessingStatus] = useState((videoInfo.videoQueue.status=="QUEUED" || videoInfo.videoQueue.status=="IN_PROCESS")?"Video Processing":(videoInfo.videoQueue.status=="FAILED" ? "Video Processing Failed" : "Video Processed"))
    const [thumbnailUrl, setThumbnailUrl] = useState(videoInfo.thumbnailUrl)
    const { execute: uploadThumbnailFn} = useAsyncFn(uploadThumbnail)
    const { execute: getVideoInfoFn} = useAsyncFn(getVideoInfo)
    const { loading: updateVideoDetailsLoading,  execute: updateVideoDetailsFn} = useAsyncFn(updateVideoDetails)
    const { loading: publishVideoLoading, execute: publishVideoFn} = useAsyncFn(publishVideo)
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
            messages.forEach((message: string)=>{
                const data =JSON.parse(message)

                if(data.type === "videoInfo"){
                    const status = data.status
                    const thumbnail = data.thumbnailUrl
                    setThumbnailUrl(thumbnail)
                    setProcessingStatus(status=="Failed" ? "Video Processing Failed" : "Video Processed")
                }else {
                    return
                }
            })
            
            
        }

    }, [messages])
    


    

    const adjustHeightDesc = () => {
        const textarea = descriptionRef.current;
        const maxCharacters = 200; 
        const maxHeight = 200;
        if (textarea) {
            
          const currentCharacters = textarea.value.length;
          if (currentCharacters > maxCharacters) {
            textarea.style.overflow = 'auto';
            textarea.style.height = `${maxHeight}px`;
          } else {
            textarea.style.overflow = 'hidden';
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
          }
        }
      };
      
      useEffect(() => {
        const textareaDesc = descriptionRef.current;
      
        if (textareaDesc) {
          adjustHeightDesc(); // Adjust the initial height and overflow
          const handleInputDesc = () => adjustHeightDesc(); // Listen for input changes
          textareaDesc.addEventListener('input', handleInputDesc);
      
          return () => {
            textareaDesc.removeEventListener('input', handleInputDesc); // Clean up event listener
          };
        }
      }, []); // Empty dependency array ensures this effect runs only once on mount
      

    useEffect(() => {
            console.log(saving)
            setSaving(true)
  

           updateVideoDetailsFn(videoInfo.id, title, description)
            .then((saved: boolean)=>{
                // console.log(`saved? ${saved}`)
                if (saved){
                    setTimeout(() => {
                        setSaving(false)
                    }, 1000);
                    
                }
            })
            
        
        
        
      }, [debounceDetails.title, debounceDetails.description]);

      function onTitleChange(title:string){

        if (title.length < 1){
            setTitleError("Title can't be empty")
            setDisableSubmit(true)
        } else {
            setTitleError("")
            setDisableSubmit(false)
        }
        
      }

    return <>
        <Modal open={isOpen} onClose={onClose} enableClickEvents={!publishVideoLoading}>
            <div className="flex flex-col justify-between my-5">
                <div className="flex sm:flex-row flex-col-reverse gap-x-10 h-80 overflow-y-scroll px-2">
                    <div className="flex flex-col gap-y-6 ">
                        <div className="flex flex-col">
                            <input 
                            onChange={(e)=>{
                                onTitleChange(e.target.value)
                                setTitle(e.target.value)
                                
                            }}
                            value={title}
                            maxLength={100}
                            type="text" placeholder="Title (required)" className="resize-none w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden"/>
                            <p className="flex justify-end">{title.length} / 100</p>
                            <label className="text-red-700">{titleError}</label>
                        </div>
                        <div className="flex flex-col">
                            <textarea 
                            maxLength={5000}
                            onChange={(e)=>{
                                setDescription(e.target.value)
                            }}
                            value={description}
                            ref={descriptionRef} placeholder="Description" className="resize-none w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden"/>
                            <p className="flex justify-end">{description.length} / 5000</p>
                        </div>

                        <div className="flex gap-x-2">
                        { thumbnailUrl ?  <span className="flex justify-center items-center text-sm bg-slate-200 py-5 w-32" onClick={handleClick}>upload thumbnail+</span> : ""}
                             <input type="file"ref={hiddenFileInput} onChange={handleFileChange} className="hidden" accept="image/*"/> 
                            { thumbnailUrl ? <img src={thumbnailUrl} alt="noImage" className="bg-slate-200 w-32 h-24"/> : <div className="bg-slate-200 w-32 h-24 animate-pulse"></div>}
                        </div>
                    </div>
                    <div className="flex flex-col sm:my-0 sm:ml-0 my-2 ml-3">
                        <div className="flex h-36 w-60 bg-slate-300 justify-center items-center">
                            { thumbnailUrl ? 
                            <img src={thumbnailUrl} alt="noImage" className="h-36 w-60"/>
                            :
                            <span>Processing...</span>
                            }
                        </div>

                        <div className="flex flex-col w-60 bg-slate-700 text-white mt-1 pl-2">

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
                    
                    <button onClick={ ()=>{
                        publishVideoFn(videoInfo.id).then(()=>{

                            window.location.reload();
                        })
                        
                        
                    }
                    }
                    className={`px-4 py-1 rounded-md ${(disableSubmit || publishVideoLoading || processingStatus !== "Video Processed") ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-800"} text-white`} disabled={(disableSubmit || publishVideoLoading || processingStatus !== "Video Processed")}>Publish</button>
                </div>
            </div>
        </Modal>
    </>
}