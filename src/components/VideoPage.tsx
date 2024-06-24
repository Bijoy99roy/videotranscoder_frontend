import { Description } from "./Description";
import { NavBar } from "./NavBar";
import { TitleBar } from "./TitleBar";
import { VideoCards, VideoCardsHorizontal } from "./VideoCards";
import { VideoPlayer } from "./VideoPlayer/VideoPlayer";
import { useWindowSize } from "@uidotdev/usehooks";
export function VideoPage(){
    const size = useWindowSize();
    
    return <>
        <NavBar />
        <div className="flex md:flex-row flex-col md:mt-10 mt-5">
            <div className="flex flex-col lg:w-8/12 lg:ml-24 sm:mx-5 mx-2">
                {/* <div className="flex flex-col w-full"> */}
                    {/* <div className="w-full"> */}
                        <VideoPlayer/>
                    {/* </div> */}
                    <TitleBar />
                {/* </div> */}
                <Description />
            </div>
            
            {/* <div className="mt-10 md:mt-0 mx-2"> */}
            {size.width ? (size.width > 768 ? <VideoCardsHorizontal /> : <VideoCards />) : ""}

                
            {/* </div> */}
            
        </div>
        
        
    </>
}