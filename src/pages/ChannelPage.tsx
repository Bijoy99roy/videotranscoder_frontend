import { useNavigate, useParams } from "react-router-dom";
import { useAsyncFn } from "../hooks/useAsync";
import { getChannelVideos, subscribeStatus } from "../services/channelService";
import { useContext, useEffect, useState } from "react";
import { CountDays } from "../helper/dayCounter";
import { VideoCards } from "../components/content/VideoCards";
import { ChannelBanner } from "../components/channel/ChannelBanner";
import { AuthContext } from "../context/authContext";
import { NavBar } from "../components/navigation/NavBar";
import { createChannelFn, handleChannel } from "../utils/channelUtils";
import { useModal } from "../hooks/useModal";
import { CreateChannelModal } from "../components/channel/CreateChannelModal";
import { ProfileDrowDown } from "../components/user/ProfileDrowDown";
import { toggleSubscribe } from "../common/channelFunctions";

export function ChannelPage(){
    const { channelId } = useParams<string>();
    const { user } = useContext(AuthContext);
    const {error, loading, value, execute} = useAsyncFn(getChannelVideos)
    const [videos, setVideos] = useState<any[]>([])
    const [channelOwner, setChannelOwner] = useState<boolean>(false)
    const [openProfile, setOpenProfile] = useState<boolean>(true);
    const navigate  = useNavigate()
    const { isOpen: isOpenModal, openModal: openModalCreateChannel, closeModal: closeModalCreateChannel } = useModal();
    
    
    useEffect(()=>{
        async function fetchVideos(){
            const videosList = await execute(channelId);

            setVideos(videosList)

            if (videosList[0].user.id === user?.id) {
                
                setChannelOwner(true)
            }
            
        }
        fetchVideos()
    }, [])

    
    return <>
    <NavBar handleChannel={()=>handleChannel(user.id, openModalCreateChannel, navigate)} onClickOpenProfile={setOpenProfile}/>
    <CreateChannelModal isOpen={isOpenModal} onClose={closeModalCreateChannel} onClickCreate={(channelName) => createChannelFn(user.id, channelName, navigate)}/>
    <ProfileDrowDown hide={openProfile}/>
        <div className="flex flex-col mx-32 mt-20 gap-y-5">
        {videos.length > 0 && <ChannelBanner userId={user.id} channelOwner={channelOwner} channelName={videos[0].channelName} videoCount={videos[0].videos.length} channelId={channelId}/>}
        <hr className="border-slate-500"/>
        <div className="flex flex-wrap">
        {videos.length > 0 && 
        videos[0].videos.map((video:any, idx:any)=>{
            const videoOldTime = CountDays(video.createdAt)
            return <VideoCards key={idx} title={video.title} thumbnail={video.thumbnailUrl} views={video.views} id={video.id} videoOldTime={videoOldTime} channelName={videos[0].channelName} channelId={video.id}/>
        })
        
        }
       </div>
       
    </div>
    </>
}