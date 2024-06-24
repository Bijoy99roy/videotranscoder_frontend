import { makeRequests } from "./makeRequests";

export async function getVideoInfo(videoId: string){
    console.log(videoId)
    const video = await makeRequests(`/api/v1/video/details/${videoId}`,{
        method: "GET"
    });

    return {
        title: video.data.title,
        description: video.data.description
    }
} 

export async function getVideos(){
    const video = await makeRequests("/api/v1/video/allVideos", {
        method: "GET"
    })

    return video.data
}