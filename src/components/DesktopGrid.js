// src/components/DesktopGrid.js
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from './DesktopGrid.module.css';

const DesktopGrid = ({ id }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return <div ref={setNodeRef} className={styles.gridCell}></div>;
};

export default DesktopGrid;
