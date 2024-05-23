import { useEffect, useState } from "react"
import { getVideoSourceList } from "../services/apiService";
import { VideoLib } from "./VideoLibs";

export function Home() {

    const [videoSources, setVideoSources] = useState([]);

    async function fetchVideoSources() {
        const response = await getVideoSourceList();
        setVideoSources(response);
    }

    useEffect(() => {
        fetchVideoSources()
    }, []);
    return <div>
        <VideoLib videoSources={videoSources}/>
    </div>
}