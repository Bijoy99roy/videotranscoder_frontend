import { RefObject, useState } from "react";
import { Modal } from "../common/Modal";


export function CreateChannelModal({isOpen=false, onClose, onClickCreate}:{isOpen?:boolean, onClose?:()=>void, onClickCreate:(key:string)=> void}){
    const [channelName, setChannelName] = useState("")
    const [channelNameError, setChannelNameError] = useState<string>()
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false)
    function onChannelNameChange(channelName:string){

        if (channelName.length < 1){
            setChannelNameError("Channel Name can't be empty")
            setDisableSubmit(true)
        } else {
            setChannelNameError("")
            setDisableSubmit(false)
        }
        
      }
    return <>
        <Modal open={isOpen} onClose={onClose} enableClickEvents={true}>
            <div className="flex">
                <span className="font-bold text-xl">
                    Create Channel
                </span>
            </div>
            <div className="flex flex-col mt-5">
                <label className="font-medium mb-2">Channel Name</label>
                <input type="text" value={channelName} className="border border-black rounded-lg py-2 px-5" maxLength={20} onChange={(e)=>{
                    onChannelNameChange(e.target.value)
                    setChannelName(e.target.value)
                }}/>
                <label className="text-red-700">{channelNameError}</label>
                <button className={`py-2 my-2 text-white ${disableSubmit  ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-800"} rounded-md`} disabled={disableSubmit} onClick={()=>{
                    onChannelNameChange(channelName)
                    if(channelName.length > 0) {
                        onClickCreate(channelName)
                    }
                    
                    }}>Create</button>
            </div>
            
            
        </Modal>
    </>
}