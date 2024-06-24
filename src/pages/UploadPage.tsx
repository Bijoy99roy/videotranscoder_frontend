import { useRef, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Table } from "../components/Table";
import { UploadModal } from "../components/UploadModal";
import { VideoInfo } from "../components/VideoInfo";
import { useModal } from "../hooks/useModal";
import { getVideoInfo } from "../services/videos";
import { uploadVideo } from "../services/uploadService";
import { useAsyncFn } from "../hooks/useAsync";

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

    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };

    const { loading: loadingVideoInfo, error: errorVideoInfo, value: videoInfo, execute: fetchVideoInfo } = useAsyncFn(async (videoId: string) => {
        return await getVideoInfo(videoId);
    });

    const { loading: loadingUpload, error: errorUpload, execute: handleUpload } = useAsyncFn(async (file: File) => {
        const response = await uploadVideo(file);
        if (response?.isUploaded) {
            fetchVideoInfo(response.videoId);
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

    return <>
        <NavBar isUploadPage={true} onUploadClick={openModalUpload}/>
        {/* <VideoInfo isOpen={isOpenVideoInfo} onClose={closeModalVideoInfo} videoInfo={videoInfo}/> */}
        {loadingUpload && <p>Uploading...</p>}
        {errorUpload && <p>Error during upload: {errorUpload.message}</p>}
        {loadingVideoInfo && <p>Loading video info...</p>}
        {errorVideoInfo && <p>Error fetching video info: {errorVideoInfo.message}</p>}
        {videoInfo && <VideoInfo isOpen={isOpenVideoInfo} onClose={closeModalVideoInfo} videoInfo={videoInfo} />}
        {/* {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>} */}
        <UploadModal isOpen={isOpenUpload} onClose={closeModalUpload} onClickHandle={handleClick} onChangeHandle={handleFileChange} refObject={hiddenFileInput}/>
        <Table />
    </>
}