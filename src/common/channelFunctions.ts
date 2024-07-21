import { SubscriberDetails } from "../components/Model/SubscriberModel";
import { getSubscriberCount, subscribeChannel, subscribeStatus } from "../services/channelService";
interface subscriberStatus {
    channelId?: string;
    subscribeStatus: boolean;
}


export async function toggleSubscribe(userId:string, channelId:string, setSubscriberStatus: (key: subscriberStatus) => void, setSubscriberDetails: (key: SubscriberDetails) => void) {
    await subscribeChannel(userId, channelId);
    const subscriberStatusValue = await subscribeStatus(userId, channelId);
    setSubscriberStatus(subscriberStatusValue);
    const subscriberCount = await getSubscriberCount(channelId);
    setSubscriberDetails({ subscriberCount: subscriberCount.subscriberCount });
}