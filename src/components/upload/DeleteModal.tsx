import { MdDelete } from "react-icons/md"
import { Modal } from "../common/Modal"

export function DeleteModal({isOpen=false, onClose, onDeleteHandle, videoId}:{isOpen?:boolean, onClose:()=>void, onDeleteHandle:(event: any)=>void, videoId:string}) {
    return <div>
        <Modal open={isOpen} onClose={onClose} enableClickEvents={true}>
                <div className="text-center w-56">
                <MdDelete size={56} className="mx-auto text-red-500"/>
                    {/* <Trash2 size={56} className="mx-auto text-red-500" /> */}
                    <div className="mx-auto my-4 w-48">
                        <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
                        <p className="text-sm text-gray-500">
                        Are you sure you want to delete this item?
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button className="btn btn-danger w-full hover:bg-red-500 hover:text-white p-2 rounded"
                        onClick={async ()=>{
                            await onDeleteHandle(videoId)
                            onClose()
                        }}>Delete</button>
                        <button
                        className="btn btn-light w-full hover:bg-slate-100 rounded"
                        onClick={onClose}
                        >
                        Cancel
                        </button>
                    </div>
                </div>
            </Modal>
    </div>
}