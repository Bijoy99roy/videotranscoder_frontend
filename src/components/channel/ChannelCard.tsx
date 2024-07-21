import { useNavigate } from "react-router-dom"

export function ChannelCard({colorIndex=Math.floor(Math.random() * 6),channelId, channelName, subscriberCount, totalVideos}:{colorIndex?: number,channelId:string, channelName: string, subscriberCount: number, totalVideos:number}){
    const colorList = ["bg-yellow-400", "bg-red-400", "bg-green-400", "bg-blue-400", "bg-violet-400", "bg-pink-400"]
    const navigate = useNavigate()
    return <div className="flex gap-x-5 border px-3 py-2 hover:bg-slate-100 rounded-md w-72 cursor-pointer" onClick={()=>navigate(`/account/${channelId}`)}>
        <span className={`rounded-full h-20 w-20 flex justify-center items-center ${colorList[colorIndex]} text-xl`}>{channelName.charAt(0)}</span>
        <div className="flex flex-col">
            <label className="text-2xl font-semibold">{channelName}</label>
            <span className="text-slate-500">{subscriberCount} subscribers</span>
            <span className="text-slate-500">{totalVideos} videos</span>
        </div>
    </div>
}