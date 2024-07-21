import { useContext, useEffect, useState } from "react";
import { NavBar } from "../components/navigation/NavBar";
import { VideoCards } from "../components/content/VideoCards";
import { useAsyncFn } from "../hooks/useAsync";
import { getAllPublishedVideos } from "../services/videosService";
import { useNavigate } from "react-router-dom";
import { CountDays } from "../helper/dayCounter";
import { CreateChannelModal } from "../components/channel/CreateChannelModal";
import { useModal } from "../hooks/useModal";
import { AuthContext } from "../context/authContext";
import { createChannelFn, handleChannel } from "../utils/channelUtils";
import { ProfileDrowDown } from "../components/user/ProfileDrowDown";

export function HomePage() {
    const navigate  = useNavigate()
    const { user } = useContext(AuthContext);
    const [videos, setVideos] = useState([]);
    const [openProfile, setOpenProfile] = useState<boolean>(true);
    const { loading, value, execute} = useAsyncFn(getAllPublishedVideos)
    const { isOpen: isOpenModal, openModal: openModalCreateChannel, closeModal: closeModalCreateChannel } = useModal();

    useEffect(() => {
        execute();
    }, [execute]);

    useEffect(() => {
        if (value) {
            setVideos(value);
        }
        
    }, [loading]);



    return <>
    
       <NavBar handleChannel={()=>handleChannel(user.id, openModalCreateChannel, navigate)} onClickOpenProfile={setOpenProfile}/> 
       <CreateChannelModal isOpen={isOpenModal} onClose={closeModalCreateChannel} onClickCreate={(channelName) => createChannelFn(user.id, channelName, navigate)}/>
       <ProfileDrowDown hide={openProfile}/>
       <div className="flex flex-wrap">
        {videos.length > 0 && 
        videos.map((video:any, idx)=>{
            const videoOldTime = CountDays(video.createdAt)
            return <VideoCards key={idx} title={video.title} thumbnail={video.thumbnailUrl} views={video.views} id={video.id} videoOldTime={videoOldTime} channelName={video.channel.channelName} channelId={video.channel.id}/>
        })
        
        }
       </div>
       
    </>
}