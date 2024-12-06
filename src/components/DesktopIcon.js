// src/components/DesktopIcon.js
import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const DesktopIcon = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        position: 'absolute', // Icons need to be absolutely positioned for free dragging
      }
    : { position: 'absolute' };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

export default DesktopIcon;
