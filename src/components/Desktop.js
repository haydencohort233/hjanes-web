import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import styles from './Desktop.module.css';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import DesktopGrid from './DesktopGrid';

const Desktop = () => {
  const rows = 10;
  const columns = 10;

  // State to manage the grid positions of icons with local storage persistence
  const [iconPositions, setIconPositions] = useState(() => {
    const savedPositions = localStorage.getItem('iconPositions');
    return savedPositions
      ? JSON.parse(savedPositions)
      : {
          'icon-1': { row: 0, col: 0 },
          'icon-2': { row: 0, col: 1 },
        };
  });

  // Effect to update local storage whenever iconPositions changes
  useEffect(() => {
    localStorage.setItem('iconPositions', JSON.stringify(iconPositions));
  }, [iconPositions]);

  // Handle drag end event
  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over) {
      const droppableId = over.id;
      const [, row, col] = droppableId.split('-');

      // Update the icon's position
      setIconPositions((prevPositions) => ({
        ...prevPositions,
        [active.id]: { row: parseInt(row, 10), col: parseInt(col, 10) },
      }));
    }
  };

  // Generate the grid cells to cover the entire desktop area
  const gridCells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      gridCells.push(
        <DesktopGrid key={`grid-${r}-${c}`} id={`grid-${r}-${c}`} />
      );
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={styles.desktop}>
        <div className={styles.gridContainer}>
          {gridCells}
        </div>

        {/* Render each desktop icon with updated positions */}
        {Object.entries(iconPositions).map(([iconId, position]) => (
          <DesktopIcon
            key={iconId}
            id={iconId}
            position={position} // Pass position as a prop
          >
            {iconId === 'icon-1' ? (
              <>
                <img src="/path/to/icon1.png" alt="Icon 1" />
                <p>My Computer</p>
              </>
            ) : (
              <>
                <img src="/path/to/icon2.png" alt="Icon 2" />
                <p>Recycle Bin</p>
              </>
            )}
          </DesktopIcon>
        ))}

        <Taskbar />
      </div>
    </DndContext>
  );
};

export default Desktop;
