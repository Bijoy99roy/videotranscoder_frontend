import { useParams } from "react-router-dom";
import { Description } from "./Description";
import { NavBar } from "./NavBar";
import { TitleBar } from "./TitleBar";
import { VideoCards, VideoCardsHorizontal } from "./VideoCards";
import { VideoPlayer } from "./VideoPlayer/VideoPlayer";
import { useWindowSize } from "@uidotdev/usehooks";
import { getVideoInfo } from "../services/videos";
import { useEffect, useState } from "react";
import { useAsyncFn } from "../hooks/useAsync";

export interface Video {
    channelId: string;
    createdAt: string;
    description: string;
    id: string;
    playlistPath: string;
    thumbnailUrl: string;
    title: string;
    updatedAt: string;
    videoPath: string;
    views: number;
}


export function VideoPage(){
    const size = useWindowSize();
    const [videoDetails, setVideoDetails] = useState<Video>()
    const { videoId } = useParams<string>()
    const {error, loading, value, execute} = useAsyncFn(getVideoInfo);
    useEffect(() => {
        console.log(videoId)
        execute(videoId);
    }, [videoId, execute]);

    useEffect(() => {
        console.log('Loading:', loading);
        console.log('Error:', error);
        console.log('Value:', value);
        if (value) {
            setVideoDetails(value);
        }
    }, [loading]);
    return <>
        <NavBar />
        {videoDetails &&
        <div className="flex md:flex-row flex-col md:mt-10 mt-5">
            <div className="flex flex-col lg:w-8/12 lg:ml-24 sm:mx-5 mx-2">
                {/* <div className="flex flex-col w-full"> */}
                    {/* <div className="w-full"> */}
                        <VideoPlayer src={videoDetails.playlistPath}/>
                    {/* </div> */}
                    <TitleBar />
                {/* </div> */}
                <Description description={videoDetails.description}/>
            </div>
            
            {/* <div className="mt-10 md:mt-0 mx-2"> */}
            {size.width ? (size.width > 768 ? <VideoCardsHorizontal /> : "<VideoCards />") : ""}

                
            {/* </div> */}
            
        </div>
        }
        
        
    </>
}