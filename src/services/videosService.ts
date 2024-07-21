import { makeRequests } from "./makeRequests";

export async function getVideoInfo(videoId: string){

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

        return video.data
    } catch(error) {
        return false
    }
    
}

export async function addViews(videoId:string, userId: string) {
    try{
        const response = await makeRequests(`/api/v1/video/addView`, {
            method: "POST",
            data:{
                videoId: videoId,
                userId: userId
            }
        })

        return response.data
    } catch(error) {
        return false
    }
}

export async function addLikeDislike(videoId:string, userId: string, type: string) {
    try{
        const response = await makeRequests(`/api/v1/video/like`, {
            method: "POST",
            data:{
                userId: userId,
                type: type,
                videoId: videoId
            }
        })

        return response.data
    } catch(error) {
        return false
    }
}

export async function getLikeDislikeStatus(videoId:string, userId: string) {
    try{
        const response = await makeRequests(`/api/v1/video/like-status`, {
            method: "POST",
            data:{
                userId: userId,
                videoId: videoId
            }
        })

        return response.data
    } catch(error) {
        return false
    }
}

export async function getLikedVideos(userId: string) {
    try{
        const response = await makeRequests(`/api/v1/video/liked-viodeos/${userId}`, {
            method: "GET",
        })

        return response.data
    } catch(error) {
        return false
    }
}

export async function getAllPublishedVideos() {
    try{
        const response = await makeRequests(`/api/v1/video/published-videos`, {
            method: "GET",
        })

        return response.data
    } catch(error) {
        return false
    }
}