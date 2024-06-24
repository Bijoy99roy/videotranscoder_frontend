import { CiEdit } from "react-icons/ci";
import "./Icons.css"
import { MdDeleteOutline } from "react-icons/md";
import { Tooltip } from "@mui/material";

// {thumbnail, title, channel, views, release}
export function VideoCards() {
    
    return (
        <> 
        <div className="flex sm:justify-start justify-center mx-2">
            <div className="flex flex-col md:ml-2 mt-2 lg:w-80 lg:h-80  cursor-pointer">
                    <img src="public\\_123883326_852a3a31-69d7-4849-81c7-8087bf630251.jpg" alt="" className="rounded-md lg:w-80 lg:h-80" />
                    <div className="flex">
                        <div className="flex mt-5">
                            <span className="flex items-center justify-center rounded-full bg-emerald-200 mr-3 text-2xl w-14 h-14 flex-shrink-0">B</span>
                            <div className="flex-col">
                                <Tooltip title="How Jaishankar made India powerful using India Middle east corridor? : Geopolitical Case Study">
                                <p className="text-xl font-semibold text-wrap line-clamp-2">How Jaishankar made India powerful using India Middle east corridor? : Geopolitical Case Study</p>
                                </Tooltip>
                                <Tooltip title="NVIDIA Geforce" placement="top">
                                <span className="flex font-sans text-slate-500 hover:text-black mt-2">NVIDIA Geforce</span>
                                </Tooltip>
                                <div className="flex">
                                    <span className="font-sans mr-2 text-slate-500">1.1M views</span>
                                    <span className="font-sans text-slate-500">6 days ago</span>
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

export function VideoCardsUpload() {
    return (
        <> 
        {/* <div className="flex"> */}
            <div className="flex mx-2 cursor-pointer mt-12 md:mt-0 group">
                    <img src="public\\_123883326_852a3a31-69d7-4849-81c7-8087bf630251.jpg" alt="" className="rounded-md sm:w-28 sm:h-20 w-24 h-16" />
                    {/* <div className="flex"> */}
                        
                            {/* <span className="flex items-center justify-center rounded-full bg-emerald-200 mr-3 text-2xl w-14 h-14 flex-shrink-0">B</span> */}
                            <div className="flex-col ml-2">
                                <p className="text-xs font-semibold text-wrap line-clamp-1">How Jaishankar made India powerful using India Middle east corridor? : Geopolitical Case Study
                                How Jaishankar made India powerful using India Middle east corridor? : Geopolitical Case Study
                                </p>
                                <span className="font-sans text-slate-500 hover:text-black mt-2 underline group-hover:hidden">Add description</span>
                                <div className="flex opacity-0 transition-opacity duration-100 transform scale-0 group-hover:opacity-100 group-hover:scale-100">
                                    <Tooltip title="edit">
                                        <div>
                                            <CiEdit className="CiEdit mr-3"/>
                                        </div>
                                    </Tooltip>
                                    <Tooltip title="delete">
                                    <div>
                                    <MdDeleteOutline className="MdDeleteOutline"/>
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
