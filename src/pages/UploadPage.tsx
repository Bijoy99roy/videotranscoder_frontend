import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { NavBar } from "../components/navigation/NavBar";
import { Table } from "../components/content/Table";
import { UploadModal } from "../components/upload/UploadModal";
import { VideoInfo } from "../components/upload/VideoInfo";
import { useModal } from "../hooks/useModal";
import { deleteVideo, getChannelVideos, getVideoInfo } from "../services/videosService";
import { uploadVideo } from "../services/uploadService";
import { useAsyncFn } from "../hooks/useAsync";
import { AuthContext } from "../context/authContext";
import { DeleteModal } from "../components/upload/DeleteModal";
import { ProfileDrowDown } from "../components/user/ProfileDrowDown";
import { useWebSocket } from "../context/useSocketContext";

export function UploadPage() {

    const { isOpen: isOpenUpload, openModal: openModalUpload, closeModal: closeModalUpload } = useModal();
    const { isOpen: isOpenVideoInfo, openModal: openModalVideoInfo, closeModal: closeModalVideoInfo } = useModal();
    const { isOpen: isOpenDeleteVideo, openModal: openModalDeleteVideo, closeModal: closeModalDeleteVideo } = useModal();
    const [openProfile, setOpenProfile] = useState<boolean>(true);
    const [uploadedVideos, setUploadedVideos] = useState();
    const [progress, setProgress] = useState<number>(-1);
    const [selectedVideoInfo, setSelectedVideoInfo] = useState<any>(null);
    const { user } = useContext(AuthContext);
    const { messages, sendMessage } = useWebSocket();

    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };
    const {  execute: DeleteVideoFn } = useAsyncFn(deleteVideo)

    const {  error: errorVideoInfo,  execute: fetchVideoInfo } = useAsyncFn(getVideoInfo);
    const { loading: loadinguploadedVideos, value: uploadedVideosData, execute: fetchUploadedVideos } = useAsyncFn(getChannelVideos)

    const { loading: loadingUpload, error: errorUpload, execute: handleUpload } = useAsyncFn(uploadVideo)

    useEffect(()=>{

            const payload = {
                type: "register",
                userId: user.id,
            }
            sendMessage(JSON.stringify(payload));
        
    }, [user.id])

    useEffect(() => {
        const fetchVideos = async () => {
        if (user && user.id) {
          const uploadedVideos = await fetchUploadedVideos(user.id)
          setUploadedVideos(uploadedVideos)
        }
    }
    fetchVideos();
      }, [user?.id]);

    useEffect(() => {
        const handler = (event:any) => {
          event.preventDefault();
          event.returnValue = '';
        };

        if (loadingUpload) {
          window.addEventListener('beforeunload', handler);

          return () => {
            window.removeEventListener('beforeunload', handler);
          };
        }

        return () => {};
      }, [loadingUpload]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const response = await handleUpload(file, setProgress);
            const videoData = await fetchVideoInfo(response.videoId);
            setSelectedVideoInfo(videoData)
            closeModalUpload();
            openModalVideoInfo();
            setProgress(-1)
        }
    };

    function closeVideoInfoModal(){
        closeModalVideoInfo()
        setSelectedVideoInfo(null)
    }

    async function onClickEdit(videoId: string) {

        const response = await fetchVideoInfo(videoId)
        setSelectedVideoInfo(response)
        if (response) {
 
            openModalVideoInfo();
        }
        
        
    };

    async function onClickDelete(videoId: string) {

        const response =  await DeleteVideoFn(videoId)
        // setUploadedVideos(response)

        const uploadedVideos = await fetchUploadedVideos(user.id)
        setUploadedVideos(uploadedVideos)
    }

    async function openDeleteModal(videoId: string){

        const response = await fetchVideoInfo(videoId)
        setSelectedVideoInfo(response)
        if (response) {

            openModalDeleteVideo();
        }
    }

    return <>
        <NavBar isUploadPage={true} onUploadClick={openModalUpload} onClickOpenProfile={setOpenProfile}/>
        <ProfileDrowDown hide={openProfile}/>

        {errorUpload && <p>Error during upload: {errorUpload.message}</p>}

        {errorVideoInfo && <p>Error fetching video info: {errorVideoInfo.message}</p>}
        {selectedVideoInfo  && <VideoInfo isOpen={isOpenVideoInfo} onClose={closeVideoInfoModal} videoInfo={selectedVideoInfo } />}

        <UploadModal isOpen={isOpenUpload} onClose={closeModalUpload} onClickHandle={handleClick} onChangeHandle={handleFileChange} refObject={hiddenFileInput} uploadProgress={progress}/>

        <Table videosInfo={uploadedVideosData} onClickEdit={onClickEdit} onClickDelete={openDeleteModal} loading={loadinguploadedVideos}/>
    
        {selectedVideoInfo  && <DeleteModal isOpen={isOpenDeleteVideo} onClose={closeModalDeleteVideo} onDeleteHandle={onClickDelete} videoId={selectedVideoInfo.id}/> }
    </>
}