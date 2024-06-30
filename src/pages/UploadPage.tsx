import { useContext, useEffect, useRef, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Table } from "../components/Table";
import { UploadModal } from "../components/UploadModal";
import { VideoInfo } from "../components/VideoInfo";
import { useModal } from "../hooks/useModal";
import { deleteVideo, getChannelVideos, getVideoInfo } from "../services/videos";
import { uploadVideo } from "../services/uploadService";
import { useAsyncFn } from "../hooks/useAsync";
import { AuthContext } from "../context/authContext";
import { DeleteModal } from "../components/DeleteModal";

interface VideoInformation{
    title: string;
    description: string;
}

interface Error {
    message: string[];
    statusCode: number;
  }

export function UploadPage() {

    const { isOpen: isOpenUpload, openModal: openModalUpload, closeModal: closeModalUpload } = useModal();
    const { isOpen: isOpenVideoInfo, openModal: openModalVideoInfo, closeModal: closeModalVideoInfo } = useModal();
    const { isOpen: isOpenDeleteVideo, openModal: openModalDeleteVideo, closeModal: closeModalDeleteVideo } = useModal();

    const [uploadedVideos, setUploadedVideos] = useState();
    const [selectedVideoInfo, setSelectedVideoInfo] = useState<any>(null);
    const { user, setUser, userData, setUserData } = useContext(AuthContext);

    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };
    const { loading: loadingDeleteVideo, error: errorDeleteVideo, value: DeleteVideo, execute: DeleteVideoFn } = useAsyncFn(deleteVideo)

    const { loading: loadingVideoInfo, error: errorVideoInfo, value: videoInfo, execute: fetchVideoInfo } = useAsyncFn(async (videoId: string) => {
        return await getVideoInfo(videoId);
    });

    const { loading: loadinguploadedVideos, error: errorUploadedVideos, value: uploadedVideosData, execute: fetchUploadedVideos } = useAsyncFn(async (userId: string) => {
        const response =  await getChannelVideos(userId);
        console.log(response)
        if (response){
            console.log(uploadedVideosData)
            setUploadedVideos(uploadedVideosData)
        }
        return response;
    });

    useEffect(() => {
        if (user && user.id) {
          fetchUploadedVideos(user.id)
        }
      }, [user, fetchUploadedVideos]);

    const { loading: loadingUpload, error: errorUpload, execute: handleUpload } = useAsyncFn(async (file: File) => {
        const response = await uploadVideo(file);
        if (response?.isUploaded) {
            const videoData = await fetchVideoInfo(response.videoId);
            setSelectedVideoInfo(videoData)
            closeModalUpload();
            openModalVideoInfo();
        }
        return response;
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleUpload(file);
        }
    };

    function closeVideoInfoModal(){
        closeModalVideoInfo()
        setSelectedVideoInfo(null)
    }

    async function onClickEdit(videoId: string) {
        console.log(videoId)
        const response = await fetchVideoInfo(videoId)
        setSelectedVideoInfo(response)
        if (response) {
            console.log(response)
            openModalVideoInfo();
        }
        
        
    };

    async function onClickDelete(videoId: string) {
        console.log(videoId)
        const response =  await DeleteVideoFn(videoId)
        // setUploadedVideos(response)
        console.log(response)
    }

    async function openDeleteModal(videoId: string){
        console.log(videoId)
        const response = await fetchVideoInfo(videoId)
        setSelectedVideoInfo(response)
        if (response) {
            console.log(response)
            openModalDeleteVideo();
        }
    }

    return <>
        <NavBar isUploadPage={true} onUploadClick={openModalUpload}/>
        {/* <VideoInfo isOpen={isOpenVideoInfo} onClose={closeModalVideoInfo} videoInfo={videoInfo}/> */}
        {loadingUpload && <p>Uploading...</p>}
        {errorUpload && <p>Error during upload: {errorUpload.message}</p>}
        {loadingVideoInfo && <p>Loading video info...</p>}
        {errorVideoInfo && <p>Error fetching video info: {errorVideoInfo.message}</p>}
        {selectedVideoInfo  && <VideoInfo isOpen={isOpenVideoInfo} onClose={closeVideoInfoModal} videoInfo={selectedVideoInfo } />}
        {/* {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>} */}
        <UploadModal isOpen={isOpenUpload} onClose={closeModalUpload} onClickHandle={handleClick} onChangeHandle={handleFileChange} refObject={hiddenFileInput}/>
        <Table videosInfo={uploadedVideosData} onClickEdit={onClickEdit} onClickDelete={openDeleteModal}/>
        {selectedVideoInfo  && <DeleteModal isOpen={isOpenDeleteVideo} onClose={closeModalDeleteVideo} onDeleteHandle={onClickDelete} videoId={selectedVideoInfo.id}/> }
    </>
}