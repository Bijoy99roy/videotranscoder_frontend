import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { VideoCards } from "../components/VideoCards";
import { useAsyncFn } from "../hooks/useAsync";
import { getVideos } from "../services/videos";

export function HomePage() {
    const [videos, setVideos] = useState([]);
    const {error, loading, value, execute} = useAsyncFn(getVideos)

    useEffect(()=>{
        const videosList = execute()
        setVideos(videosList)
    }, [])
    
    return <>
    
       <NavBar /> 
       
        <VideoCards />
    </>
}