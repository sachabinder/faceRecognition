import React, {useEffect, useState, useCallback} from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';

/**
 * Component coding all the availale devices
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
