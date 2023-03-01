import React, {useEffect, useRef} from 'react';

/**
 * Component coding the webcam framwork
 * Render the component
 * @return {Component} A component
 */
export default function WebCam() {
  const videoRef = useRef(null);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
        .getUserMedia({video: {width: 550}})
        .then((stream) => {
          const video = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.error('error:', err);
        });
    console.log(videoRef);
  };
  return <video ref={videoRef} />;
}
