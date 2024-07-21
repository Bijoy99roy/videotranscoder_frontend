import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../components/navigation/NavBar";
import { VideoCards, VideoCardsHorizontal } from "../components/content/VideoCards";
import { useWindowSize } from "@uidotdev/usehooks";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { getAllPublishedVideos } from "../services/videosService";
import { useAsyncFn } from "../hooks/useAsync";
import { CountDays } from "../helper/dayCounter";
// import { VideoInfo } from "../components/upload/VideoInfo";
import { VideoPlayerInfo } from "../components/video/VideoPlayerInfo";
import { createChannelFn, handleChannel } from "../utils/channelUtils";
import { useModal } from "../hooks/useModal";
import { CreateChannelModal } from "../components/channel/CreateChannelModal";
import { ProfileDrowDown } from "../components/user/ProfileDrowDown";
import { Video } from "../components/Model/videoModel";



export function VideoPage() {
    const size = useWindowSize();
    const navigate  = useNavigate()
    const [videos, setVideos] = useState<Video[]>([]);
    const { videoId } = useParams<string>();
    const { execute: videoListFn } = useAsyncFn(getAllPublishedVideos);
    const { user } = useContext(AuthContext);
    const { isOpen: isOpenModal, openModal: openModalCreateChannel, closeModal: closeModalCreateChannel } = useModal();
    const [openProfile, setOpenProfile] = useState<boolean>(true);
    useEffect(() => {
        const fetchVideos = async () => {
            const videosData = await videoListFn();
            setVideos(videosData);
        };
        fetchVideos();
    }, [videoListFn]);

    return (
        <>
            <NavBar handleChannel={()=>handleChannel(user.id, openModalCreateChannel, navigate)} onClickOpenProfile={setOpenProfile}/> 
            <CreateChannelModal isOpen={isOpenModal} onClose={closeModalCreateChannel} onClickCreate={(channelName) => createChannelFn(user.id, channelName, navigate)}/>
            <ProfileDrowDown hide={openProfile}/>
            <div className="flex md:flex-row flex-col md:mt-10 mt-5 mb-10 pr-5">
                <VideoPlayerInfo videoId={videoId} user={user} />
                <div className="flex flex-col gap-y-3">
                    {videos
                        .filter((video: any) => video.id !== videoId)
                        .map((video: any, idx: any) => {
                            const videoOldTime = CountDays(video.createdAt);
                            return size.width ? (
                                size.width > 768 ? (
                                    <VideoCardsHorizontal
                                        key={idx}
                                        title={video.title}
                                        thumbnail={video.thumbnailUrl}
                                        views={video.views}
                                        id={video.id}
                                        videoOldTime={videoOldTime}
                                        channelName={video.channel.channelName}
                                        channelId={video.channel.id}
                                    />
                                ) : (
                                    <VideoCards
                                        key={idx}
                                        title={video.title}
                                        thumbnail={video.thumbnailUrl}
                                        views={video.views}
                                        id={video.id}
                                        videoOldTime={videoOldTime}
                                        channelName={video.channel.channelName}
                                        channelId={video.channel.id}
                                    />
                                )
                            ) : null;
                        })}
                </div>
            </div>
        </>
    );
}
