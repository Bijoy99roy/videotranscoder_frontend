
import { getChannelInfo, createChannel } from '../services/channelService';


export async function handleChannel(userId: string, openModalCreateChannel: () => void, navigate: (path: string) => void): Promise<void> {
    const hasChannel = await getChannelInfo(userId);
    if (!hasChannel.channelExists) {
        openModalCreateChannel();
    } else {
        navigate("/channel");
    }
}

export async function createChannelFn(userId: string, channelName: string, navigate: (path: string) => void): Promise<void> {
    const channel = await createChannel(userId, channelName);
    if (channel) {
        navigate("/channel");
    }
}
