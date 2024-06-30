import { makeRequests } from "./makeRequests";

export async function getVideoInfo(videoId: string){
    console.log(videoId)
    const video = await makeRequests(`/api/v1/video/details/${videoId}`,{
        method: "GET"
    });

    return video.data
} 

export async function getVideos(){
    const video = await makeRequests("/api/v1/video/allVideos", {
        method: "GET"
    })

    return video.data
}

export async function getChannelVideos(userId: string){
    const video = await makeRequests(`/api/v1/video/uploadedVideos/${userId}`, {
        method: "GET"
    })
    console.log(video)
    return video.data
}

export async function deleteVideo(videoId: string){
    try{
        const video = await makeRequests(`/api/v1/video/deleteFolder`, {
            method: "POST",
            data:{
                videoId: videoId
            }
        })
        console.log(video)
        return video.data
    } catch(error) {
        return false
    }
    
}