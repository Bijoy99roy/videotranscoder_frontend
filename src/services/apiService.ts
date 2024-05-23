import axios from "axios";

export const getVideoSourceList = async () => {
    // const availableVideos: string[] = [];
    try{
        const response = await axios.get("http://localhost:8000/videos")

        if (response.status == 200) {
            return response.data.videoUrls
        }
    } catch (err) {
        console.error('Error fetching video files', err)
        
    }
}