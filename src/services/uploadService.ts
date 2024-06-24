import axios from "axios";
import { makeRequests } from "./makeRequests";

export async function uploadVideo(video:any){
    const contentType = video.type
    const fileName = video.name
    try {

        const response = await makeRequests("/api/v1/upload/generateSignedUrlWrite",{
            method: "GET",
            params:{
                fileName: fileName,
                contentType: contentType
            }
        })
        // const response = await axios.get("http://localhost:3000/api/v1/upload/generateSignedUrlWrite",{
        //     params:{
        //         fileName: fileName,
        //         contentType: contentType
        //     },
        //     withCredentials: true,
        // }
        // );

        console.log("After signed url")
        console.log(response)
        if (response.status == 200) {
            console.log(response)
            const {signedUrl, videoId} = response.data
            
            await axios.put(signedUrl, video,{
                headers:{
                    "Content-Type": contentType,
                    "Accept": 'application/json'
                     
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
                console.log("Video upload and transcoding queued successfully.");
                return {isUploaded:true, videoId: videoId}
            } else {
                console.error("Failed to queue transcoding:", responseTranscoding.data);
                return {isUploaded:false, videoId: ""}
            }

        }
    } catch (error) {
        console.error("Error uploading video:", error);
        return {isUploaded:false, videoId: ""}
    }
    
}