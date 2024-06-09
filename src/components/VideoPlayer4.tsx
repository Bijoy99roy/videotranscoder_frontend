import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';

interface HlsPlayerProps {
  src: string;
}

export const VideoPlayer = () => {
  const src = "http://localhost:3000/hls-videos/9f0008d2-37c3-487c-b7ff-d9e162bdc2f3/playlist.m3u8"
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | undefined;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('MANIFEST_PARSED event fired');
        if (isPlaying) {
          video.play().catch((error) => {
            console.error('Error attempting to play:', error);
          });
        }
      });
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error:', data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error('Fatal network error encountered, trying to recover');
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error('Fatal media error encountered, trying to recover');
              hls?.recoverMediaError();
              break;
            default:
              console.error('Fatal error encountered, destroying HLS instance');
              hls?.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        console.log('loadedmetadata event fired');
        if (isPlaying) {
          video.play().catch((error) => {
            console.error('Error attempting to play:', error);
          });
        }
      });
    }

    // return () => {
    //   if (hls) {
    //     hls.destroy();
    //   }
    // };
  }, [src, isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Error attempting to play:', error);
      });
    }
  };

  return ( 
    <div>
      <video ref={videoRef} controls style={{ width: '100%' }} />
      {!isPlaying && <button onClick={handlePlay}>Play Video</button>}
    </div>
  );
};