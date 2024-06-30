import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { VideoCards } from "../components/VideoCards";
import { useAsyncFn } from "../hooks/useAsync";
import { getVideos } from "../services/videos";
import { useNavigate } from "react-router-dom";
import { CountDays } from "../helper/dayCounter";

export function HomePage() {
    const navigate  = useNavigate()
    const [videos, setVideos] = useState([]);
    const {error, loading, value, execute} = useAsyncFn(getVideos)

    useEffect(() => {
        execute();
    }, [execute]);

    useEffect(() => {
        console.log('Loading:', loading);
        console.log('Error:', error);
        console.log('Value:', value);
        if (value) {
            setVideos(value);
        }
    }, [loading]);

    function onClickNavigate(route: string){

    }

    return <>
    
       <NavBar /> 
       <div className="flex flex-wrap">
        {videos.length > 0 && 
        videos.map((video:any, idx)=>{
            const videoOldTime = CountDays(video.createdAt)
            return <VideoCards key={idx} title={video.title} thumbnail={video.thumbnailUrl} views={video.views} id={video.id} videoOldTime={videoOldTime}/>
        })
        
        }
       </div>
       
    </>
}