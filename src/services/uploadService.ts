import axios, { AxiosProgressEvent } from "axios";
import { makeRequests } from "./makeRequests";

export async function uploadVideo(video:any, onProgress: (progress: number) => void){
    const contentType = video.type
    const fileName = video.name

    try {

        const response = await makeRequests("/api/v1/upload/generateSignedUrlWrite",{
            method: "GET",
            params:{
                fileName: fileName,
                contentType: contentType,
                type: "video"
            }
        })


        if (response.status == 200) {

            const {signedUrl, videoId} = response.data
            
            await axios.put(signedUrl, video,{
                headers:{
                    "Content-Type": contentType,
                    "Accept": 'application/json'
                     
                },
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        onProgress(percentCompleted);

                    }
                }
            })
            
            const responseTranscoding = await makeRequests("/api/v1/upload/queueTranscoding",{
                method: "POST",
                data:{
                    videoId:videoId,
                    url: signedUrl
                },
                headers:{
                    "Content-Type": "application/json"
                }
            });
            
            // const responseTranscoding = await axios.post("http://localhost:3000/api/v1/upload/queueTranscoding",{
            //     videoId:videoId,
            //     url: signedUrl
            // },{
            //     withCredentials: true,
            //     headers:{
            //         "Content-Type": "application/json"
            //     }
            // });

            if (responseTranscoding.status === 200) {

                return {isUploaded:true, videoId: videoId}
            } else {

                return {isUploaded:false, videoId: ""}
            }

        }
    } catch (error) {

        return {isUploaded:false, videoId: ""}
    }
    
}

export async function uploadThumbnail(image:any, videoId: string) {
    const contentType = image.type
    const fileName = image.name

    try {

        const response = await makeRequests("/api/v1/upload/generateSignedUrlWrite",{
            method: "GET",
            params:{
                fileName: fileName,
                contentType: contentType,
                type: "image",
                videoId: videoId

            }
        })


        if (response.status == 200) {

            const {signedUrl, videoId} = response.data

            await axios.put(signedUrl, image,{
                headers:{
                    "Content-Type": contentType,
                    "Accept": 'application/json'
                     
                }
            })
            
            return {isUploaded:false, videoId: videoId};
        }
    } catch (error) {
        console.error("Error uploading thumbnail:", error);
        return {isUploaded:false, videoId: ""}
    }
}

export async function updateVideoDetails(videoId: string, title: string, description: string){
    try{
        const video = await makeRequests(`/api/v1/upload/updateDetails`, {
            method: "PUT",
            data:{
                videoId: videoId,
                title: title,
                description: description
            }
        })
        return video.data
    } catch (error) {
        console.log("Error occured while updating video details")
        return false
    }
    
}

export async function publishVideo(videoId: string){
    try{
        const video = await makeRequests(`/api/v1/upload/publish`, {
            method: "PUT",
            data:{
                videoId: videoId,
            }
        })
        return video.data
    } catch (error) {
        console.log("Error occured while updating video details")
        return false
    }
    
}