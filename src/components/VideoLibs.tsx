import { VideoPlayer } from "./VideoPlayer/VideoPlayer"

export const VideoLib = ({ videoSources }: { videoSources: string[]}) => {
    return (
        <VideoPlayer videoSource={videoSources[0]}/>
    )

}