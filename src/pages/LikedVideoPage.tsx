import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useAsyncFn } from "../hooks/useAsync";
import { useModal } from "../hooks/useModal";
import { NavBar } from "../components/navigation/NavBar";
import { CreateChannelModal } from "../components/channel/CreateChannelModal";
import { ProfileDrowDown } from "../components/user/ProfileDrowDown";
import { createChannelFn, handleChannel } from "../utils/channelUtils";
import { CountDays } from "../helper/dayCounter";
import { VideoCards } from "../components/content/VideoCards";
import { getLikedVideos } from "../services/videosService";

export function LikedVideoPage(){
    const navigate  = useNavigate()
    const { user } = useContext(AuthContext);
    const [videos, setVideos] = useState([]);
    const [openProfile, setOpenProfile] = useState<boolean>(true);
    const { execute} = useAsyncFn(getLikedVideos)
    const { isOpen: isOpenModal, openModal: openModalCreateChannel, closeModal: closeModalCreateChannel } = useModal();

    useEffect(() => {
        const fetchVideos = async () => {
        if (user && user.id) {

          const uploadedVideos = await execute(user.id)
          setVideos(uploadedVideos)
        }
    }
    fetchVideos();
      }, [user?.id]);
    return <>
        <NavBar handleChannel={()=>handleChannel(user.id, openModalCreateChannel, navigate)} onClickOpenProfile={setOpenProfile}/> 
       <CreateChannelModal isOpen={isOpenModal} onClose={closeModalCreateChannel} onClickCreate={(channelName) => createChannelFn(user.id, channelName, navigate)}/>
       <ProfileDrowDown hide={openProfile}/>
        <div className="flex flex-col sm:mx-3 mx-2 gap-y-2 my-2 p-5 bg-gradient-to-r from-red-400 rounded-md">
            <label className="text-4xl font-bold text-white">Liked Videos</label>
            <label className="text-white font-semibold">{videos.length} videos</label>
        </div>
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