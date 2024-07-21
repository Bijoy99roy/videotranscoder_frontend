import { makeRequests } from "./makeRequests";

export async function createChannel(userId: string, channelName: string){

    const channel = await makeRequests(`/api/v1/channels/create-channel`,{
        method: "POST",
        data:{
            userId: userId,
            channelName: channelName
        }
    });

    return channel.data
} 

export async function getChannelInfo(userId: string){
    const channelExists = await makeRequests(`/api/v1/channels/${userId}/channel-exists`,{
        method: "GET",
    });

    return channelExists.data
} 

export async function subscribeChannel(userId: string, channelId: string){
    const subscribeChannel = await makeRequests(`/api/v1/channels/subscribe-unsubscribe`,{
        method: "POST",
        data:{
            userId: userId,
            channelId: channelId
        }
    });

    return subscribeChannel.data
}

export async function subscribeStatus(userId: string, channelId: string){
    const video = await makeRequests(`/api/v1/channels/subscribe-status?userId=${userId}&channelId=${channelId}`,{
        method: "GET",
    });

    return video.data
}
export async function getSubscriberCount(channelId: string){
    const video = await makeRequests(`/api/v1/channels/${channelId}/subscriber-count`,{
        method: "GET",
    });
   
    return video.data
}

export async function getChannelVideos(channelId: string){
    const video = await makeRequests(`/api/v1/channels/channelVideos/${channelId}`,{
        method: "GET",
    });
   
    return video.data
} 
export async function getSubscribedChannels(userId: string){
    const channels = await makeRequests(`/api/v1/channels/subscriptions/${userId}`,{
        method: "GET",
    });
  
    return channels.data
} 