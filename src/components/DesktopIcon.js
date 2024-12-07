import React, { useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';

const DesktopIcon = ({ id, children, position }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  // Track hover and click states
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Track initial position in local state
  const [initialPosition, setInitialPosition] = useState({
    top: position.row * 10,
    left: position.col * 10,
  });

  // Update initial position when props change
  useEffect(() => {
    setInitialPosition({
      top: position.row * 10,
      left: position.col * 10,
    });
  }, [position]);

  const style = {
    position: 'absolute',
    top: `${initialPosition.top}%`,
    left: `${initialPosition.left}%`,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: transform ? undefined : 'transform 0.2s ease',
    backgroundColor: clicked
      ? 'rgba(0, 123, 255, 0.3)' // Bright highlight on click
      : hovered
      ? 'rgba(0, 123, 255, 0.2)' // Subtle highlight on hover
      : 'transparent',
    border: clicked ? '2px solid rgba(0, 123, 255, 0.8)' : 'none',
    borderRadius: '4px', // Optional for a rounded highlight
  };

  // Handle click state without interfering with dragging
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent interference with drag events
    setClicked((prev) => !prev);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={handleClick} // Use onMouseDown instead of onClick
    >
      {children}
    </div>
  );
};

export default DesktopIcon;
