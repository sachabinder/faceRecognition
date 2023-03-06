import React, {useEffect, useRef, useState} from 'react';
import {CircularProgress} from '@mui/material';
import WebCam from 'react-webcam';
import BoundingBox from './BoundingBox';

const videoConstraints = {
  width: 540,
  height: 405,
  facingMode: 'user',
  frameRate: {ideal: 10, max: 10},
};

/**
 * Component coding the webcam framwork
 * Render the component
 * @return {Component} A component
 */
export default function Camera({setDetectedProfile}) {
  const webcamRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [boundingBox, setBoundingBox] = useState(null);

  const onUserMedia = (e) => {
    setIsStreaming(true);
  };

  const fetchFaceDetection = async () => {
    const imagSrc = webcamRef.current.getScreenshot();
    const formData = new FormData();
    formData.append('image', imagSrc);
    const response = await fetch('http://localhost:8000/api/find/', {
      method: 'POST',
      body: formData,
    });

    if (response.status === 200) {
      const content = await response.json();
      const boundingBoxCords = {
        x: content.source_x,
        y: content.source_y,
        w: content.source_w,
        h: content.source_h,
      };
      setBoundingBox(boundingBoxCords);
      setDetectedProfile(content.profile);
    } else {
      setBoundingBox(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      await fetchFaceDetection();
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{position: 'relative'}}>
      <WebCam
        forceScreenshotSourceSize
        ref={webcamRef}
        audio={false}
        videoConstraints={videoConstraints}
        mirrored={true}
        onUserMedia={onUserMedia}
      />
      {!isStreaming && <CircularProgress />}
      {boundingBox && (
        <BoundingBox
          top={boundingBox.y}
          left={boundingBox.x}
          width={boundingBox.w}
          height={boundingBox.h}
        />
      )}
    </div>
  );
}
