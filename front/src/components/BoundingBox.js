import React from 'react';

/**
 * Component coding the bounding box
 * Render the component
 * @return {Component} A component
 */
export default function BoundingBox({
  top,
  left,
  width,
  height,
  borderRadius = 4,
  color = 'red',
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: top,
        left: left,
        width: width,
        height: height,
        border: borderRadius + 'px solid ' + color,
        backgroundColor: 'transparent',
      }}
    />
  );
}
