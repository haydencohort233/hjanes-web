import React, { useCallback, useState, useEffect } from 'react';
import styles from './Window.module.css';

const Window = ({ title = 'Window', onClose, children }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Handle drag start
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  // Memoize handleMouseMove to avoid re-creation on every render
  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart]);

  // Handle drag end
  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]); // Properly listed dependencies

  return (
    <div 
      className={styles.window} 
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {/* Header with title and close button */}
      <div className={styles.titleBar} onMouseDown={handleMouseDown}>
        <span className={styles.title}>{title}</span>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      </div>

      {/* Window content */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Window;
