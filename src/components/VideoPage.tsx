import { NavBar } from "./NavBar";
import { TitleBar } from "./TitleBar";
import { VideoPlayer } from "./VideoPlayer";

export function VideoPage(){
    return <>
        <NavBar />
        <div className="w-7/12 ml-24 mt-10">
            <VideoPlayer />
            <TitleBar />
        </div>
    </>
}