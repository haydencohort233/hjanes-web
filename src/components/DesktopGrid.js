// src/components/DesktopGrid.js
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from './DesktopGrid.module.css';

const DesktopGrid = ({ id }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  // Inline style for visibility during development (can be removed later)
  const style = {
    width: '100%',
    height: '100%'
  };

  return <div ref={setNodeRef} style={style} className={styles.gridCell}></div>;
};

export default DesktopGrid;
