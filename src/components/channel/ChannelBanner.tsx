import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { SignInPromptModal } from "../user/SignInPromptModal";
import { toggleSubscribe } from "../../common/channelFunctions";
import { useAsyncFn } from "../../hooks/useAsync";
import { getSubscriberCount, subscribeStatus } from "../../services/channelService";
import { SubscriberDetails, subscriberStatus } from "../Model/SubscriberModel";

export function ChannelBanner({userId, channelOwner=false, channelName, videoCount, channelId}:{userId:string, channelOwner:boolean, channelName: string, videoCount: number, channelId?: string}){
    const { isOpen: isOpenUpload, openModal: openModalUpload, closeModal: closeModalUpload } = useModal();
    const [subscriberDetails, setSubscriberDetails] = useState<SubscriberDetails>({ subscriberCount: 0 });
    const [subscriberStatus, setSubscriberStatus] = useState<subscriberStatus>({ subscribeStatus: false });
    const { execute: SubscribeStatusFn } = useAsyncFn(subscribeStatus);
    const { execute: SubscriberCountFn, loading: SubscriberCountLoading } = useAsyncFn(getSubscriberCount);
    async function onToggleSubscribe(){
        if (channelId){
            await toggleSubscribe(userId, channelId, setSubscriberStatus, setSubscriberDetails)

        }
        
    }

    useEffect(()=>{
        async function fetchSubscriberDetails(){
            if (channelId && userId) {
                const subscriberCount = await SubscriberCountFn(channelId);
                setSubscriberDetails({ subscriberCount: subscriberCount.subscriberCount });
                const subscriberStatusData = await SubscribeStatusFn(userId, channelId);
                setSubscriberStatus(subscriberStatusData);

            }
        }
        fetchSubscriberDetails()
    }, [channelId, userId])
    return <>
    { !SubscriberCountLoading &&
        <div className="flex gap-x-5">
        <span className="rounded-full h-20 w-20 flex justify-center items-center bg-green-400 text-4xl">{channelName.charAt(0)}</span>
        <div className="flex flex-col gap-y-2">
            <p className="text-2xl font-semibold">{channelName}</p>
            <span className="text-slate-600">{subscriberDetails.subscriberCount} subscribers</span>
            <span className="text-slate-600">{videoCount} Videos</span>
            { channelOwner ? "" 
            :
            <button className={`rounded-3xl md:px-5 md:py-2 px-3 py-1 md:text-base text-sm ${subscriberStatus.subscribeStatus ? "text-black border bg-slate-200": "bg-black  text-white"}  font-medium`} onClick={()=>{
                        if(!userId){
                            openModalUpload()
                        }else{
                            onToggleSubscribe()
                        }
                        
                    } }>{subscriberStatus ? "Subscribed" : "Subscribe"}</button>
            }
        </div>
        <SignInPromptModal isOpen={isOpenUpload} onClose={closeModalUpload}/>
    </div>
    }
    </>
}