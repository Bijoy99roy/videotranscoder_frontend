import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import 'videojs-seek-buttons/dist/videojs-seek-buttons.css';
import 'videojs-seek-buttons';
import "video.js/dist/video-js.css"; 
import "videojs-contrib-quality-levels";
// import 'videojs-contrib-hls';
import "videojs-http-source-selector";
import "../css/video.css"

// import 'videojs-seek-buttons';
// import 'videojs-seek-buttons/dist/videojs-seek-buttons.css';

export const VideoPlayer = ({src}:{src:string}) => {
    const videoRef = useRef<any>(null);
    const playerRef = useRef<any>(null);


    const videoPlayerOptions = {
      responsive: true,
        autoplay: true,
        fluid: true,
          controls: true,
          playbackRates: [0.5, 1, 1.5, 2],
          controlBar: {
            playToggle: true,
            volumePanel: {
              inline: false
            },
            fullscreenToggle: true
          },
        plugins: {
            httpSourceSelector: {default: "auto"},
            seekButtons: {
                      forward: 15,
                      back: 15
                    }
        },
        sources: [
            {
                src: src,
                // src: "http://localhost:3000/hls-videos/9f0008d2-37c3-487c-b7ff-d9e162bdc2f3/playlist.m3u8",
                type: 'application/x-mpegURL'
            }
        ]
    };

    const handlePlayerReady = (player: any) => {
        playerRef.current = player;

        player.on('waiting',  () => {
            videojs.log("player is waiting");
        })

        

        player.on("dispose", () => {
            videojs.log("Player will dispose");
        })
    };

    useEffect(()=>{
        if (!playerRef.current) {
          const videoElement = document.createElement("video-js");
          videoElement.classList.add('vjs-big-play-centered');

              videoRef.current.appendChild(videoElement);

 
            const player = (playerRef.current =  videojs(videoElement, videoPlayerOptions, () => {

            player.on('ready',  () => {
              playerRef.current = player
              

              videojs.log("player is ready!!!"); 
          })

              
              handlePlayerReady && handlePlayerReady(player);
          }));

      
            
        } else {
          

            const player = playerRef.current;

            player.autoplay(videoPlayerOptions.autoplay)
            player.src(videoPlayerOptions.sources)
            
            
            
          // }
            
        }
    }, [videoPlayerOptions, videoRef]);

    useEffect(()=>{
      console.log("dispose", playerRef.current)
        const player = playerRef.current;
        return () => {
            if (player && !player.isDisposed()){
                player.dispose();
                playerRef.current = null; 
            }
        }
    }, [playerRef]);


    return <div data-vjs-player>

          <div ref={videoRef}/>
 
        </div>
};
export const MemoizedVideoPlayer = React.memo(VideoPlayer);