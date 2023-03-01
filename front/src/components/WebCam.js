import React, {useState, useEffect, useRef} from 'react';

export default function WebCam() {
  const WIDTH = 500;
  const HEIGHT = 500;
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
