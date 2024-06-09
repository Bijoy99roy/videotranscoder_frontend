import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
export function TitleBar() {
    return (
        <div className="flex flex-col mt-2">
            <p className="text-3xl font-semibold">How to perform Adaptive Bitrate Streaming</p>
            <div className="flex mt-5 justify-between items-center">
                <div className="flex items-center">
                    <span className="flex justify-center items-center rounded-full w-10 h-10 bg-teal-300 cursor-pointer">B</span>
                    <div className="flex flex-col ml-2">
                        <span className="font-semibold text-lg cursor-pointer">ByteByteGo</span>
                        <span className="text-sm text-slate-500">127k subscribers</span>
                    </div>
                    <button className="rounded-3xl px-5 py-2 bg-black ml-5 text-white font-medium">Subscribe</button>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center cursor-pointer">
                        <div className="flex hover:bg-slate-300 bg-slate-200 rounded-l-3xl space-x-2 px-4 py-2">
                            <AiOutlineLike size={24} />
                            <span>56</span>
                        </div>
                        <span className="border-l border-black h-6"></span>
                        <div className="flex  hover:bg-slate-300 bg-slate-200 rounded-r-3xl space-x-2 px-4 py-2">
                            <AiOutlineDislike size={24} />
                            <span>67</span>
                        </div>
                        
                        
                    </div>
                        
                    <div className="flex items-center space-x-2 bg-slate-200 rounded-3xl px-4 py-2 cursor-pointer hover:bg-slate-300">
                        <PiShareFat size={24} />
                        <span>Share</span>
                    </div>
                </div>
            </div>
        </div>
    );
}