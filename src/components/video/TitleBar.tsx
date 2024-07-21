import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import "../css/Icons.css"
import { Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { SignInPromptModal } from "../user/SignInPromptModal";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";

interface TitleBarProps {
    likeCount: number;
    dislikeCount: number;
    onToggleLikeDislike: (type: 'LIKE' | 'DISLIKE') => void;
    likeStatus: any;
    channelName: string;
    videoTitle: string;
    onToggleSubscribe: () => void;
    subscriberStatus: boolean;
    subscriberCount: number;
    channelId: string;
    channelOwnerId: string
}

export function TitleBar({likeCount=0, dislikeCount=0, onToggleLikeDislike, likeStatus, channelName, videoTitle, onToggleSubscribe, subscriberStatus, subscriberCount, channelId, channelOwnerId}:TitleBarProps ) {
    const { user } = useContext(AuthContext);
    const { isOpen: isOpenUpload, openModal: openModalUpload, closeModal: closeModalUpload } = useModal();
    const [channelOwner, setChannelOwner] = useState<boolean>(false)
    const navigate  = useNavigate()
    useEffect(()=>{
        if (user.id === channelOwnerId){
            setChannelOwner(true)
        }
    }, [channelOwnerId])

    return (
        <div className="flex flex-col mt-2">
            <p className="md:text-3xl sm:text-2xl text-xl font-semibold">{videoTitle}</p>
            <div className="flex flex-col md:flex-row mt-5 justify-between md:items-center">
                <div className="flex md:items-center justify-between">
                    <div className="flex">
                        <span className="flex justify-center items-center rounded-full md:w-10 md:h-10 w-8 h-8 bg-teal-300 cursor-pointer">{channelName.charAt(0)}</span>
                        <div className="flex md:flex-col ml-2">
                            <Tooltip title={channelName} placement="top">
                                <span className="font-semibold md:text-lg text-sm cursor-pointer" onClick={()=>navigate(`/account/${channelId}`)}>{channelName}</span>
                            </Tooltip>
                            {/* <span className="font-semibold md:text-lg text-sm cursor-pointer">ByteByteGo</span> */}
                            <span className="md:ml-0 ml-1 text-sm text-slate-500">{subscriberCount} Subscriber</span>
                        </div>
                    </div>
                    
                    { channelOwner ? ""
                    : 
                    <button className={`rounded-3xl md:px-5 md:py-2 px-3 py-1 md:text-base text-sm ${subscriberStatus ? "text-black border bg-slate-200": "bg-black ml-5 text-white"} ml-5 font-medium`} onClick={()=>{
                        if(!user || !user.id){
                            openModalUpload()
                        }else{
                            onToggleSubscribe()
                        }
                        
                        
                    } }>{subscriberStatus ? "Subscribed" : "Subscribe"}</button>
                }
                </div>
                <div className="flex items-center space-x-4 md:mt-0 mt-3">
                    <div className="flex items-center cursor-pointer">
                    <Tooltip title="I like this" placement="top">
                        <div className="flex hover:bg-slate-300 bg-slate-200 rounded-l-3xl space-x-2 md:px-4 md:py-2 px-2 py-1" onClick={()=>{
                            if(!user || !user.id){
                                openModalUpload()
                            } else {
                                onToggleLikeDislike("LIKE")
                            }
                            
                            
                            }}>
                        {likeStatus.likeStatus == "LIKE" ?
                            <AiFillLike className="AiOutlineLike"/>
                            :
                            <AiOutlineLike  className="AiOutlineLike"/>
                        }
                            <span className="md:text-base text-sm">{likeCount}</span>
                        </div>
                    </Tooltip>
                        <span className="border-l border-black h-6"></span>
                        <Tooltip title="I dislike this" placement="top">
                        <div className="flex  hover:bg-slate-300 bg-slate-200 rounded-r-3xl space-x-2 md:px-4 md:py-2 px-2 py-1" onClick={()=>{
                            if(!user || !user.id){
                                openModalUpload()
                            } else {
                                onToggleLikeDislike("DISLIKE")
                            }
                            
                        }}>
                            {likeStatus.likeStatus == "DISLIKE" ?
                            <AiFillDislike className="AiOutlineDislike"/>
                            :
                            <AiOutlineDislike   className="AiOutlineDislike"/>
                            
                            }
                            <span className="md:text-base text-sm">{dislikeCount}</span>
                        </div>
                    </Tooltip>
                        
                        
                    </div>
                    {/* <Tooltip title="Share" placement="top">
                    <div className="flex items-center space-x-2 bg-slate-200 rounded-3xl md:px-4 md:py-2 px-3 py-1 cursor-pointer hover:bg-slate-300">
                        <PiShareFat  className="PiShareFat"/>
                        <span className="md:text-base text-sm">Share</span>
                    </div>
                    </Tooltip> */}
                </div>
            </div>
            <SignInPromptModal isOpen={isOpenUpload} onClose={closeModalUpload}/>
        </div>
    );
}