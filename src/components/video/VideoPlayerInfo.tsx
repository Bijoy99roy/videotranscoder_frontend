import { useEffect, useState } from "react";
import { useAsyncFn } from "../../hooks/useAsync";
import { getVideoInfo, addViews, getLikeDislikeStatus, addLikeDislike } from "../../services/videosService";
import { getSubscriberCount, subscribeChannel, subscribeStatus } from "../../services/channelService";
import { Description } from "./Description";
import { TitleBar } from "./TitleBar";
import { MemoizedVideoPlayer } from "./VideoPlayer";
import { useWebSocket } from "../../context/useSocketContext";
import { toggleSubscribe } from "../../common/channelFunctions";
import { SubscriberDetails, subscriberStatus } from "../Model/SubscriberModel";
import { LikeDisLike, LikeStatus, Video } from "../Model/videoModel";






export function VideoPlayerInfo({ videoId, user }:{videoId:string | undefined, user:any }) {
    const [videoDetails, setVideoDetails] = useState<Video>();
    const [likeDetails, setLikeDetails] = useState<LikeDisLike>({ likeCount: 0, dislikeCount: 0 });
    const [likeStatus, setLikeStatus] = useState<LikeStatus>();
    const [videoView, setVideoView] = useState<number>(0);
    const [subscriberDetails, setSubscriberDetails] = useState<SubscriberDetails>({ subscriberCount: 0 });
    const [subscriberStatus, setSubscriberStatus] = useState<subscriberStatus>({ subscribeStatus: false });

    const { execute: getVideoInfoFn } = useAsyncFn(getVideoInfo);
    const { execute: addViewsFn } = useAsyncFn(addViews);
    const { execute: LikeDisLikeFn } = useAsyncFn(addLikeDislike);
    const { execute: LikeStatusFn } = useAsyncFn(getLikeDislikeStatus);
    const { execute: SubscribeFn } = useAsyncFn(subscribeChannel);
    const { execute: SubscribeStatusFn } = useAsyncFn(subscribeStatus);
    const { execute: SubscriberCountFn } = useAsyncFn(getSubscriberCount);

    const { messages, sendMessage } = useWebSocket();

    useEffect(()=>{
        if (messages.length>0){

            messages.forEach((message: string)=>{
                const data =JSON.parse(message)

                if(data.type === "views" && data.videoId==videoId){
                    setVideoView(data.views)
                }
            })
            
            
        }
        
        
    }, [messages])

    useEffect(() => {
        const fetchVideoData = async () => {
            if (videoId) {
                const videoInfo = await getVideoInfoFn(videoId);
                setVideoDetails(videoInfo);
                setVideoView(videoInfo.views)
                await addViewsFn(videoId, user?.id || "");
                const likeDislikeStatus = await LikeStatusFn(videoId, user?.id || "");
                setLikeStatus(likeDislikeStatus);
                setLikeDetails({ likeCount: likeDislikeStatus.likeCount, dislikeCount: likeDislikeStatus.dislikeCount });
                const subscriberCount = await SubscriberCountFn(videoInfo?.channelId);
                setSubscriberDetails({ subscriberCount: subscriberCount.subscriberCount });
            }
        };

        fetchVideoData();
    }, [videoId, user?.id]);

    useEffect(() => {
        const fetchSubscriberStatus = async () => {
            if (videoDetails?.channelId && user?.id) {
                const subscriberStatusData = await SubscribeStatusFn(user.id, videoDetails.channelId);
                setSubscriberStatus(subscriberStatusData);
            }
        };

        fetchSubscriberStatus();
    }, [user?.id, videoDetails?.channelId]);

    // async function toggleLikeDislike(type: string) {
    //     const videoDetail = await LikeDisLikeFn(videoDetails?.id as string, user.id, type);
    //     setLikeDetails(videoDetail);
    //     const likeStatusValue = await LikeStatusFn(videoId, user.id);
    //     setLikeStatus(likeStatusValue);
    // }

    async function toggleLikeDislikeFn(type: string) {
        if(!user || !user.id) return
        let newLikeCount = likeDetails.likeCount;
        let newDislikeCount = likeDetails.dislikeCount;
    
        if (type === 'LIKE') {
            if (likeStatus?.likeStatus === 'LIKE') {

                newLikeCount--;
                setLikeStatus({...likeStatus, likeStatus: "", likeCount: newLikeCount});
                setLikeDetails({likeCount: newLikeCount, dislikeCount: newDislikeCount});
            } else {

                newLikeCount++;
                if (likeStatus?.likeStatus === 'DISLIKE') {

                    newDislikeCount--;
                }
                setLikeStatus(prevLikeStatus => ({
                    ...prevLikeStatus,
                    likeStatus: 'LIKE',
                    likeCount: newLikeCount,
                    dislikeCount: newDislikeCount,
                    videoId: videoDetails?.id || ''
                }));
                setLikeDetails({likeCount: newLikeCount, dislikeCount: newDislikeCount});

                const videoDetail = await LikeDisLikeFn(videoDetails?.id as string, user.id, type);
            }
        } else if (type === 'DISLIKE') {
            if (likeStatus?.likeStatus === 'DISLIKE') {

                newDislikeCount--;
                setLikeStatus({...likeStatus, likeStatus: ""});
                setLikeDetails({likeCount: newLikeCount, dislikeCount: newDislikeCount});
            } else {

                newDislikeCount++;
                if (likeStatus?.likeStatus === 'LIKE') {

                    newLikeCount--;
                }
                setLikeStatus(prevLikeStatus => ({
                    ...prevLikeStatus,
                    likeStatus: 'DISLIKE',
                    likeCount: newLikeCount,
                    dislikeCount: newDislikeCount,
                    videoId: videoDetails?.id || ''
                }));
                setLikeDetails({likeCount: newLikeCount, dislikeCount: newDislikeCount});

                const videoDetail = await LikeDisLikeFn(videoDetails?.id as string, user.id, type);

            }
        }
    }


    async function subscribe(){
        if (videoDetails){
            await toggleSubscribe(user.id, videoDetails?.channelId, setSubscriberStatus, setSubscriberDetails)
        }
        
    }

    return (
        <>
            {videoDetails && (
                <div className="flex flex-col lg:w-8/12 lg:ml-24 sm:mx-5 mx-2">
                    <MemoizedVideoPlayer src={videoDetails.playlistPath} />
                    
                    {likeStatus && subscriberDetails && (
                        <TitleBar
                            likeCount={likeDetails.likeCount}
                            dislikeCount={likeDetails.dislikeCount}
                            onToggleLikeDislike={toggleLikeDislikeFn}
                            likeStatus={likeStatus}
                            channelName={videoDetails.channel.channelName}
                            videoTitle={videoDetails.title}
                            onToggleSubscribe={subscribe}
                            subscriberStatus={subscriberStatus.subscribeStatus}
                            subscriberCount={subscriberDetails.subscriberCount}
                            channelId={videoDetails.channel.id}
                            channelOwnerId={videoDetails.channel.user.id}
                        />
                    )}
                    <Description description={videoDetails.description} views={videoView} videoAge={videoDetails.createdAt} />
                </div>
            )}
        </>
    );
}
