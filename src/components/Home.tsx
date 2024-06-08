import { useEffect, useState } from "react"
import { getVideoSourceList } from "../services/apiService";
import { VideoLib } from "./VideoLibs";

export function Home() {

    const [videoSources, setVideoSources] = useState<string[]>([]);

    async function fetchVideoSources() {
        // const response = await getVideoSourceList();
        setVideoSources([""]);
    }

    useEffect(() => {
        fetchVideoSources()
    }, []);
    return <div>
        <VideoLib videoSources={videoSources}/>
    </div>
}