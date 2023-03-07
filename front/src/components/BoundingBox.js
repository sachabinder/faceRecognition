import React from 'react';

/**
 * Component coding the bounding box
 * @param {int} top the x top corner coordinate
 * @param {int} left the y top corner coordinate
 * @param {int} width the width of the box
 * @param {int} height the height of the box
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
