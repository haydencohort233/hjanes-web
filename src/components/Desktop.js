import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import styles from './Desktop.module.css';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import DesktopGrid from './DesktopGrid';

const Desktop = () => {
  const rows = 10;
  const columns = 10;

  const [iconPositions, setIconPositions] = useState(() => {
    const savedPositions = localStorage.getItem('iconPositions');
    return savedPositions
      ? JSON.parse(savedPositions)
      : {
          'icon-1': { row: 0, col: 0 },
          'icon-2': { row: 0, col: 1 },
        };
  });

  const [activeIcon, setActiveIcon] = useState(null);

  useEffect(() => {
    localStorage.setItem('iconPositions', JSON.stringify(iconPositions));
  }, [iconPositions]);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over) {
      const droppableId = over.id;
      const [, row, col] = droppableId.split('-');

      // Prevent icons from sharing the same cell
      const isOccupied = Object.values(iconPositions).some(
        (pos) => pos.row === parseInt(row, 10) && pos.col === parseInt(col, 10)
      );

      if (!isOccupied) {
        setIconPositions((prevPositions) => ({
          ...prevPositions,
          [active.id]: { row: parseInt(row, 10), col: parseInt(col, 10) },
        }));
      }
    }
  };

  const handleClickOutside = () => setActiveIcon(null);

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
      <div className={styles.desktop} onClick={handleClickOutside}>
        <div className={styles.gridContainer}>{gridCells}</div>
        {Object.entries(iconPositions).map(([iconId, position]) => (
          <DesktopIcon
            key={iconId}
            id={iconId}
            position={position}
            isActive={activeIcon === iconId}
            onActivate={() => setActiveIcon(iconId)}
          >
            <div className={styles.iconWrapper}>
              {iconId === 'icon-1' ? (
                <>
                  <img
                    className={styles.desktopIcon}
                    src="/assets/desktop/discord.png"
                    alt="Icon 1"
                  />
                  <p className={styles.iconLabel}>My Computer</p>
                </>
              ) : (
                <>
                  <img
                    className={styles.desktopIcon}
                    src="assets/avatar/avatar.png"
                    alt="Icon 2"
                  />
                  <p className={styles.iconLabel}>Recycle Bin</p>
                </>
              )}
            </div>
          </DesktopIcon>
        ))}
        <Taskbar />
      </div>
    </DndContext>
  );
};

export default Desktop;
