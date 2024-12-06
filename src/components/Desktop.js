import React from 'react';
import { DndContext } from '@dnd-kit/core';
import styles from './Desktop.module.css';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import DesktopGrid from './DesktopGrid';

const Desktop = () => {
  const rows = 10;
  const columns = 10;

  // Generate grid cells
  const gridCells = [];
  for (let i = 0; i < rows * columns; i++) {
    gridCells.push(
      <DesktopGrid key={`grid-${i}`} id={`grid-${i}`} />
    );
  }

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over) {
      const droppableId = over.id;
      console.log(`Icon ${active.id} dropped on ${droppableId}`);
      // Add logic to update the icon's position here if needed
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={styles.desktop}>
        <div className={styles.gridContainer}>
          {gridCells}
        </div>

        {/* Draggable Desktop Icons */}
        <DesktopIcon id="icon-1">
          <img src="/path/to/icon1.png" alt="Icon 1" />
          <p>My Computer</p>
        </DesktopIcon>
        <DesktopIcon id="icon-2">
          <img src="/path/to/icon2.png" alt="Icon 2" />
          <p>Recycle Bin</p>
        </DesktopIcon>

        <Taskbar />
      </div>
    </DndContext>
  );
};

export default Desktop;
