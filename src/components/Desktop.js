import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import styles from './Desktop.module.css';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import DesktopGrid from './DesktopGrid';
import Window from './window/Window';
import SkillsWindow from './skills/SkillsWindow';
import AboutMeWindow from './about/AboutMeWindow'; // Import the About Me window

const Desktop = () => {
  const rows = 10;
  const columns = 10;

  const [iconPositions, setIconPositions] = useState(() => {
    const savedPositions = localStorage.getItem('iconPositions');
    return savedPositions
      ? JSON.parse(savedPositions)
      : {
          'icon-1': { row: 1, col: 0 }, // About Me
          'icon-2': { row: 1, col: 1 }, // Recycle Bin
          'icon-3': { row: 1, col: 2 }, // My Skills
        };
  });

  const [activeIcon, setActiveIcon] = useState(null);
  const [openWindows, setOpenWindows] = useState([]); // Store multiple open windows

  useEffect(() => {
    localStorage.setItem('iconPositions', JSON.stringify(iconPositions));
  }, [iconPositions]);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over) {
      const droppableId = over.id;
      const [, row, col] = droppableId.split('-');

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

  const openWindow = (id, title, content) => {
    setOpenWindows((prevWindows) => [
      ...prevWindows,
      { id, title, content },
    ]);
  };

  const closeWindow = (id) => {
    setOpenWindows((prevWindows) => prevWindows.filter((win) => win.id !== id));
  };

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
            onOpen={() => {
              if (iconId === 'icon-1') {
                openWindow(
                  'window-about-me',
                  'About Me',
                  <AboutMeWindow /> // The content for the About Me window
                );
              } else if (iconId === 'icon-2') {
                openWindow(
                  'window-2',
                  'Recycle Bin',
                  <p>This is the Recycle Bin. No items to display.</p>
                );
              } else if (iconId === 'icon-3') {
                openWindow(
                  'window-3',
                  'My Skills',
                  <SkillsWindow />
                );
              } else {
                console.log(`Double-clicked on ${iconId}`);
              }
            }}
          >
            <div className={styles.iconWrapper}>
              {iconId === 'icon-1' ? (
                <>
                  <img
                    className={styles.desktopIcon}
                    src="/assets/desktop/about.png"
                    alt="About Me"
                  />
                  <p className={styles.iconLabel}>About Me</p>
                </>
              ) : iconId === 'icon-2' ? (
                <>
                  <img
                    className={styles.desktopIcon}
                    src="assets/avatar/avatar.png"
                    alt="Recycle Bin"
                  />
                  <p className={styles.iconLabel}>Recycle Bin</p>
                </>
              ) : (
                <>
                  <img
                    className={styles.desktopIcon}
                    src="/assets/desktop/skills.png"
                    alt="My Skills"
                  />
                  <p className={styles.iconLabel}>My Skills</p>
                </>
              )}
            </div>
          </DesktopIcon>
        ))}

        <Taskbar />

        {openWindows.map((win) => (
          <Window 
            key={win.id} 
            title={win.title} 
            onClose={() => closeWindow(win.id)}
          >
            {win.content}
          </Window>
        ))}
      </div>
    </DndContext>
  );
};

export default Desktop;
