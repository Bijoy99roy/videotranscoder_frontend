import { CiEdit } from "react-icons/ci";
import "./Icons.css"
import { MdDeleteOutline } from "react-icons/md";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

// {thumbnail, title, channel, views, release}
export function VideoCards({title, thumbnail, views, id, videoOldTime}:{title:string, thumbnail:string, views:number, id:string, videoOldTime:string}) {
    const navigate = useNavigate()
    console.log(id)
    const handleChannelClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        navigate(`/channel`);
    };
    return (
        <> 
        <div className="flex sm:justify-start justify-center mx-1" onClick={()=>navigate(`/watch/${id}`)}>
            <div className="flex flex-col md:ml-2 mt-2 lg:w-72 cursor-pointer">
                    <img src={thumbnail} alt="" className="rounded-md lg:w-auto lg:h-40" />
                    <div className="flex">
                        <div className="flex mt-5">
                            <span className="flex items-center justify-center rounded-full bg-emerald-200 mr-3 text-2xl w-12 h-12 flex-shrink-0">B</span>
                            <div className="flex-col">
                                <Tooltip title="How Jaishankar made India powerful using India Middle east corridor? : Geopolitical Case Study">
                                <p className="text-xl font-semibold text-wrap line-clamp-2">{title}</p>
                                </Tooltip>
                                <Tooltip title="NVIDIA Geforce" placement="top">
                                <span className="flex font-sans text-slate-500 hover:text-black mt-2" onClick={handleChannelClick}>NVIDIA Geforce</span>
                                </Tooltip>
                                <div className="flex">
                                    <span className="font-sans mr-2 text-slate-500">{views} views</span>
                                    <span className="font-sans text-slate-500">{videoOldTime} ago</span>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
        </div>
            
        </>
    );
}

export function VideoCardsHorizontal() {
    return (
        <> 
        {/* <div className="flex"> */}
            <div className="flex mx-2 sm:w-4/12 cursor-pointer mt-12 md:mt-0">
                    <img src="public\\_123883326_852a3a31-69d7-4849-81c7-8087bf630251.jpg" alt="" className="rounded-md sm:w-56 sm:h-32 w-24 h-16" />
                    {/* <div className="flex"> */}
                        
                            {/* <span className="flex items-center justify-center rounded-full bg-emerald-200 mr-3 text-2xl w-14 h-14 flex-shrink-0">B</span> */}
                            <div className="flex-col ml-1">
                            <Tooltip title="How Jaishankar made India powerful using India Middle east corridor? : Geopolitical Case Study">
                                <p className="text-lg font-semibold text-wrap line-clamp-2">How Jaishankar made India powerful using India Middle east corridor? : Geopolitical Case Study</p>
                            </Tooltip>
                            <Tooltip title="NVIDIA Geforce" placement="top">
                                <span className="flex font-sans text-slate-500 hover:text-black mt-2">NVIDIA Geforce</span>
                            </Tooltip>
                                <div className="flex">
                                    <span className="font-sans mr-2 text-slate-500">1.1M views</span>
                                    <span className="font-sans text-slate-500">6 days ago</span>
                                </div>
                            {/* </div> */}
                        
                    </div>
                </div>
        {/* </div> */}
            
        </>
    );
}

export function VideoCardsUpload({videoId, videoTitle, videoDescription, thumbnail, onClickEdit, onClickDelete}:{videoId: string, videoTitle: string, videoDescription:string, thumbnail:string, onClickEdit:(key:string)=>void, onClickDelete:(key:string)=>void}) {
    return (
        <> 
        {/* <div className="flex"> */}
            <div className="flex mx-2 cursor-pointer mt-12 md:mt-0 group">
                    <img src={thumbnail} alt="" className="rounded-md sm:w-28 sm:h-20 w-24 h-16" />
                    {/* <div className="flex"> */}
                        
                            {/* <span className="flex items-center justify-center rounded-full bg-emerald-200 mr-3 text-2xl w-14 h-14 flex-shrink-0">B</span> */}
                            <div className="flex-col ml-2">
                                <p className="text-xs font-semibold text-wrap line-clamp-1">{videoTitle}
                                </p>
                                <span className={`font-sans text-slate-500 hover:text-black mt-2 ${videoDescription.length ? "" : "underline"} group-hover:hidden`}>{videoDescription.length ? videoDescription.substring(0, 100) : "Add description"}</span>
                                <div className="flex opacity-0 transition-opacity duration-100 transform scale-0 group-hover:opacity-100 group-hover:scale-100">
                                    <Tooltip title="edit">
                                        <div >
                                            <CiEdit className="CiEdit mr-3" onClick={()=>{
                                                console.log(videoId)
                                                onClickEdit(videoId)
                                            }}/>
                                        </div>
                                    </Tooltip>
                                    <Tooltip title="delete">
                                    <div>
                                    <MdDeleteOutline className="MdDeleteOutline" onClick={()=>onClickDelete(videoId)}/>
                                    </div>
                                    </Tooltip>
                                </div>
                                
                            {/* </div> */}
                        
                    </div>
                </div>
        {/* </div> */}
            
        </>
    );
}
