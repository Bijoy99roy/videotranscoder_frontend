import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/navigation/NavBar";
import { createChannelFn, handleChannel } from "../utils/channelUtils";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useAsyncFn } from "../hooks/useAsync";
import { useModal } from "../hooks/useModal";
import { CreateChannelModal } from "../components/channel/CreateChannelModal";
import { ProfileDrowDown } from "../components/user/ProfileDrowDown";
import { ChannelCard } from "../components/channel/ChannelCard";
import { getSubscribedChannels } from "../services/channelService";

export function SubscriptionPage(){
    const navigate  = useNavigate()
    const { user } = useContext(AuthContext);
    const [subscribedChannels, setSubscribedChannels] = useState([]);
    const [openProfile, setOpenProfile] = useState<boolean>(true);
    const { execute} = useAsyncFn(getSubscribedChannels)
    const { isOpen: isOpenModal, openModal: openModalCreateChannel, closeModal: closeModalCreateChannel } = useModal();
    useEffect(() => {
        const fetchVideos = async () => {
        if (user && user.id) {

          const channels = await execute(user.id)
          setSubscribedChannels(channels)
        }
    }
    fetchVideos();
      }, [user?.id]);
    return <>
        <NavBar handleChannel={()=>handleChannel(user.id, openModalCreateChannel, navigate)} onClickOpenProfile={setOpenProfile}/> 
       <CreateChannelModal isOpen={isOpenModal} onClose={closeModalCreateChannel} onClickCreate={(channelName) => createChannelFn(user.id, channelName, navigate)}/>
       <ProfileDrowDown hide={openProfile}/>
       <div className="flex flex-col sm:mx-3 mx-2 gap-y-2 my-2 p-5 bg-gradient-to-r from-yellow-400 rounded-md">
            <label className="text-4xl font-bold text-white">Subscriptions</label>
            <label className="text-white font-semibold">{subscribedChannels.length} subscriptions</label>
        </div>
       <div className="mx-3 flex flex-wrap gap-3">
        {subscribedChannels.length > 0 && subscribedChannels.map((channel:any, idx)=>{
  
            return <ChannelCard key={idx} channelId={channel.id} channelName={channel.channelName} subscriberCount={channel._count.subscribers} totalVideos={channel._count.videos}/>
        })}
       </div>
    
    </>
}