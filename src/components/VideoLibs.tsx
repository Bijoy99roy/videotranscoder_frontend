import { VideoPlayer } from "./VideoPlayer"

export const VideoLib = ({ videoSources }: { videoSources: string[]}) => {
    return (
        <VideoPlayer videoSource={videoSources[0]}/>
    )

}