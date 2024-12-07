import React, { useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';

const DesktopIcon = ({ id, children, position, isActive, onActivate }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const [initialPosition, setInitialPosition] = useState({
    top: position.row * 10,
    left: position.col * 10,
  });

  // Track double-click
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    setInitialPosition({
      top: position.row * 10,
      left: position.col * 10,
    });
  }, [position]);

  useEffect(() => {
    if (clickCount === 2) {
      console.log(`Double-clicked on icon: ${id}`);
      setClickCount(0); // Reset click count
    }
    const timer = setTimeout(() => setClickCount(0), 300); // Reset after 300ms
    return () => clearTimeout(timer);
  }, [clickCount, id]);

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent propagation to desktop
    onActivate(); // Activate this icon
    setClickCount((prev) => prev + 1); // Increment click count
  };

  const style = {
    position: 'absolute',
    top: `${initialPosition.top}%`,
    left: `${initialPosition.left}%`,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: transform ? undefined : 'transform 0.2s ease',
    backgroundColor: isActive
      ? 'rgba(0, 123, 255, 0.3)' // Highlight for active icon
      : 'transparent',
    border: isActive ? '2px solid rgba(0, 123, 255, 0.8)' : 'none',
    borderRadius: '4px',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onMouseDown={handleClick} // Handle single and double-click
    >
      {children}
    </div>
  );
};

export default DesktopIcon;
