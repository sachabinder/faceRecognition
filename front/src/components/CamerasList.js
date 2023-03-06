import React, {useEffect, useState, useCallback} from 'react';
import {FormControl, InputLabel, NativeSelect} from '@mui/material';

/**
 * Component coding all the device cameras list
 * Render the component
 * @return {Component} A component
 */
export default function CamerasList() {
  const [devices, setDevices] = useState([]);

  const handleDevices = useCallback(
      (mediaDevices) =>
        setDevices(mediaDevices.filter(({kind}) => kind === 'videoinput')),
      [setDevices],
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return (
    <div>
      <FormControl sx={{margin: 1}}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native" />
        <NativeSelect
          inputProps={{
            id: 'uncontrolled-native',
            name: 'camera',
          }}
        >
          {devices.map((device, key) => (
            <option key={key}>{device.label || `Camera ${key + 1}`}</option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
}
