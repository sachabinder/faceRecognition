import React, {useEffect, useRef} from 'react';
import WebCam from 'react-webcam';

const videoConstraints = {
  width: 540,
  facingMode: 'user',
  frameRate: {ideal: 3, max: 5},
};

/**
 * Component coding the webcam framwork
 * Render the component
 * @return {Component} A component
 */
export default function Camera({setDetectedProfile}) {
  const webcamRef = useRef(null);

  const onUserMedia = (e) => {
    console.log(e);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const imagSrc = webcamRef.current.getScreenshot();
      const formData = new FormData();
      formData.append('image', imagSrc);
      const response = await fetch('http://localhost:8000/api/find/', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        const content = await response.json();
        setDetectedProfile(content.profile);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <WebCam
      forceScreenshotSourceSize
      ref={webcamRef}
      audio={false}
      videoConstraints={videoConstraints}
      onUserMedia={onUserMedia}
      mirrored={true}
    />
  );
}
