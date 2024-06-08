import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Hls from "hls.js";
export const VideoPlayer = ({ videoSource }: { videoSource: string}) => {
    const videoRef = useRef<any>(null);
    const playerRef = useRef<any>(null);
    // const { options, onReady } = props;
    // const playerRef = useRef(null);

    const video: any = document.getElementById('video');
    const videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoSource);
        hls.attachMedia(video);
    }
    // HLS.js is not supported on platforms that do not have Media Source
    // Extensions (MSE) enabled.
    //
    // When the browser has built-in HLS support (check using `canPlayType`),
    // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
    // element through the `src` property. This is using the built-in support
    // of the plain video element, without using HLS.js.
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
    }

    return (
        <video id="video"></video>
    );
}