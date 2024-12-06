import React, { useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';

const DesktopIcon = ({ id, children, position }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  // Track initial position in local state for the DesktopIcon
  const [initialPosition, setInitialPosition] = useState({
    top: position.row * 10,
    left: position.col * 10,
  });

  // Update the initial position whenever the prop changes (e.g., after a drop)
  useEffect(() => {
    setInitialPosition({
      top: position.row * 10,
      left: position.col * 10,
    });
  }, [position]);

  // Calculate the style to ensure the icon does not snap back
  const style = {
    position: 'absolute',
    top: `${initialPosition.top}%`,
    left: `${initialPosition.left}%`,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: transform ? undefined : 'transform 0.2s ease', // Smooth repositioning after drop
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

export default DesktopIcon;
