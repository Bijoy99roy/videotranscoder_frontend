import { useState } from "react"
import { CountDays } from "../../helper/dayCounter";

export function Description({description, views, videoAge}:{description:string, views:number, videoAge: string}) {
    const [showMore, setShowMore] = useState(false);
    const videoOldTime = CountDays(videoAge)
    
    return <>
        <div className="bg-slate-200 rounded-md p-5 mt-5">
            <p className="font-semibold">
            {views} views {videoOldTime} ago
            </p>
            <p className="whitespace-break-spaces">
                
                {showMore ? description : description.substring(0, 20)} {" "}
                <button onClick={()=>setShowMore(prev=> !prev)} className={showMore ? "font-semibold flex flex-col mt-5" : "font-semibold"}
                >{showMore ? "Show less" : "Show more"}</button>
            </p>
        </div>
    </>
}