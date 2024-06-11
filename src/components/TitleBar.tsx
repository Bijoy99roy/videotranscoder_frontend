import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import "./Icons.css"
export function TitleBar() {

    return (
        <div className="flex flex-col mt-2">
            <p className="md:text-3xl sm:text-2xl text-xl font-semibold">How to perform Adaptive Bitrate Streaming</p>
            <div className="flex flex-col md:flex-row mt-5 justify-between md:items-center">
                <div className="flex md:items-center justify-between">
                    <div className="flex">
                        <span className="flex justify-center items-center rounded-full md:w-10 md:h-10 w-8 h-8 bg-teal-300 cursor-pointer">B</span>
                        <div className="flex md:flex-col ml-2">
                            <span className="font-semibold md:text-lg text-sm cursor-pointer">ByteByteGo</span>
                            <span className="md:ml-0 ml-1 text-sm text-slate-500">127k Subscriber</span>
                        </div>
                    </div>
                    
                    <button className="rounded-3xl md:px-5 md:py-2 px-3 py-1 md:text-base text-sm bg-black ml-5 text-white font-medium">Subscribe</button>
                </div>
                <div className="flex items-center space-x-4 md:mt-0 mt-3">
                    <div className="flex items-center cursor-pointer">
                        <div className="flex hover:bg-slate-300 bg-slate-200 rounded-l-3xl space-x-2 md:px-4 md:py-2 px-2 py-1">
                            <AiOutlineLike  className="AiOutlineLike"/>
                            <span className="md:text-base text-sm">56</span>
                        </div>
                        <span className="border-l border-black h-6"></span>
                        <div className="flex  hover:bg-slate-300 bg-slate-200 rounded-r-3xl space-x-2 md:px-4 md:py-2 px-2 py-1">
                            <AiOutlineDislike   className="AiOutlineDislike"/>
                            <span className="md:text-base text-sm">67</span>
                        </div>
                        
                        
                    </div>
                        
                    <div className="flex items-center space-x-2 bg-slate-200 rounded-3xl md:px-4 md:py-2 px-3 py-1 cursor-pointer hover:bg-slate-300">
                        <PiShareFat  className="PiShareFat"/>
                        <span className="md:text-base text-sm">Share</span>
                    </div>
                </div>
            </div>
        </div>
    );
}