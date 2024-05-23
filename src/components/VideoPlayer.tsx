import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import 'videojs-seek-buttons/dist/videojs-seek-buttons.css';
import 'videojs-seek-buttons';
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
// import 'videojs-contrib-hls';
import "videojs-http-source-selector";

// import 'videojs-seek-buttons';
// import 'videojs-seek-buttons/dist/videojs-seek-buttons.css';

export const VideoPlayer = ({ videoSource }: { videoSource: string}) => {
    const videoRef = useRef<any>(null);
    const playerRef = useRef<any>(null);
    const [playerReady, setplayerReady] = useState(false);

    const videoPlayerOptions = {
      
        autoplay: false,
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
                src: videoSource,
                type: 'application/x-mpegURL'
            }
        ]
    };

    const handlePlayerReady = (player: any) => {
        playerRef.current = player;
        // player.seekable
        player.on('waiting',  () => {
            videojs.log("player is waiting");
        })

        

        player.on("dispose", () => {
            videojs.log("Player will dispose");
        })
    };

    useEffect(()=>{
      // let player:any = null;
        if (!playerRef.current) {
          const videoElement = document.createElement("video-js");
          videoElement.classList.add('vjs-big-play-centered');
          // videoElement.classList.add("vjs-default-skin");
            // videoElement.classList.add('vjs-http-source-selector');
          videoRef.current.appendChild(videoElement);

          const player = (playerRef.current = videojs(videoElement, videoPlayerOptions, () => {
            // console.log(videoPlayerOptions.sources[0])
            //   player.src(videoPlayerOptions.sources[0])
            player.on('ready',  () => {
              playerRef.current = player
              
              // playerRef.current = player

              videojs.log("player is ready!!!"); 
          })
              // videojs.log("Player is ready");
              
              handlePlayerReady && handlePlayerReady(player);
          }));

            

            
            // async function load(){
              
              
            // }
            // load()
            
            
        } else {
          console.log('else')
          
            const player = playerRef.current;

            
            player.src(videoPlayerOptions.sources)
            
            player.autoplay(videoPlayerOptions.autoplay)
            playerRef.current = null;
        }
    }, [videoPlayerOptions, videoRef]);

    // useEffect(() => {
    //     if (playerRef.current) {
    //       const currentTime = playerRef.current.currentTime();
    //       // playerRef.current.src(videoPlayerOptions.sources[0]);
    //       playerRef.current.currentTime(currentTime);
    //     }
    //   }, [videoPlayerOptions.sources[0]]);

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


    return <div
    data-vjs-player
  >
      
        
       <div ref={videoRef} />
        

        
      </div>
};
