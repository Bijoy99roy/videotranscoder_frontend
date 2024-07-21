import { CiEdit } from "react-icons/ci";
import "../css/Icons.css"
import { MdDeleteOutline } from "react-icons/md";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";


export function VideoCards({title, thumbnail, views, id, videoOldTime, channelName, channelId}:{title:string, thumbnail:string, views:number, id:string, videoOldTime:string, channelName:string, channelId:string}) {
    const navigate = useNavigate()

    const handleChannelClick = (event: React.MouseEvent<HTMLSpanElement>)  => {
        event.stopPropagation();
        navigate(`/account/${channelId}`);
    };
    return (
        <> 
        <div className="flex sm:justify-start justify-center mx-1" onClick={()=>navigate(`/watch/${id}`)}>
        {/* <a href={`/watch/${id}`}> */}
            <div className="flex flex-col md:ml-2 mt-2 lg:w-72 cursor-pointer">
                    <img src={thumbnail} alt="" className="rounded-md lg:w-auto lg:h-40" />
                    <div className="flex">
                        <div className="flex mt-5">
                            <span className="flex items-center justify-center rounded-full bg-emerald-200 mr-3 text-2xl w-12 h-12 flex-shrink-0">{channelName.charAt(0)}</span>
                            <div className="flex-col">
                                <Tooltip title={title}>
                                <p className="text-xl font-semibold text-wrap line-clamp-2">{title}</p>
                                </Tooltip>
                                {/* <a href={`/account/${channelId}`}> */}
                                <Tooltip title={channelName} placement="top">
                                <span className="flex font-sans text-md text-slate-500 hover:text-black mt-1" onClick={handleChannelClick}>{channelName}</span>
                                </Tooltip>
                                {/* </a> */}
                                <div className="flex">
                                    <span className="font-sans mr-2 text-slate-500">{views} views</span>
                                    <span className="font-sans text-slate-500">{videoOldTime} ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </a> */}
        </div>
            
        </>
    );
}

export function VideoCardsHorizontal({title, thumbnail, views, id, videoOldTime, channelName, channelId}:{title:string, thumbnail:string, views:number, id:string, videoOldTime:string, channelName:string, channelId:string}) {
    const navigate = useNavigate()

    const handleChannelClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        navigate(`/account/${channelId}`);
    };
    return (
        <> 
            <div className="flex mx-2 w-full cursor-pointer mt-12 md:mt-0" onClick={()=>navigate(`/watch/${id}`)}>
            {/* <a href={`/watch/${id}`}> */}
            <div className="flex">
                    <img src={thumbnail} alt="" className="rounded-md sm:w-56 sm:h-32 w-24 h-16" />

                    <div className="flex flex-col ml-1">
                            <Tooltip title={title}>
                                <p className="text-lg font-semibold line-clamp-2">{title}</p>
                            </Tooltip>
                            {/* <a href={`/account/${channelId}`}> */}
                            <Tooltip title="NVIDIA Geforce" placement="top">
                                <span className="flex font-sans text-slate-500 hover:text-black mt-2" onClick={handleChannelClick}>{channelName}</span>
                            </Tooltip>
                            {/* </a> */}
                            <div className="flex">
                                <span className="font-sans mr-2 text-slate-500">{views} views</span>
                                <span className="font-sans text-slate-500">{videoOldTime} ago</span>
                            </div>

                        
                    </div>
                    </div>
                    {/* </a> */}
                </div>

            
        </>
    );
}

export function VideoCardsUpload({videoId, videoTitle, videoDescription, thumbnail,queueStatus, onClickEdit, onClickDelete}:{videoId: string, videoTitle: string, videoDescription:string, thumbnail:string,queueStatus:string,  onClickEdit:(key:string)=>void, onClickDelete:(key:string)=>void}) {

    return (
        <> 

            <div className="flex mx-2 cursor-pointer mt-12 md:mt-0 group">
                    <img src={thumbnail} alt="" className="rounded-md sm:w-28 sm:h-20 w-24 h-16" />


                            <div className="flex-col ml-2">
                                <p className="text-xs font-semibold text-wrap line-clamp-1">{videoTitle}
                                </p>
                                <span className={`font-sans text-slate-500 hover:text-black mt-2 ${videoDescription.length ? "" : "underline"} group-hover:hidden`}>{videoDescription.length ? videoDescription.substring(0, 100) : "Add description"}</span>
                                <div className="flex opacity-0 transition-opacity duration-100 transform scale-0 group-hover:opacity-100 group-hover:scale-100">
                                    <Tooltip title="edit">
                                        <div >
                                            <CiEdit className="CiEdit mr-3" onClick={()=>{
  
                                                onClickEdit(videoId)
                                            }}/>
                                        </div>
                                    </Tooltip>
                                    <Tooltip title="delete">
                                    <div>
                                    <MdDeleteOutline className={`MdDeleteOutline ${(queueStatus == "IN_PROCESS" || queueStatus == "QUEUED") ? "hidden" : "visible"}`} onClick={()=>onClickDelete(videoId)}/>
                                    </div>
                                    </Tooltip>
                                </div>
                                

                        
                    </div>
                </div>

            
        </>
    );
}
