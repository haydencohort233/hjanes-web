import React, { useState, useEffect, useRef } from 'react';
import styles from './Taskbar.module.css';
import startButtonIcon from '../assets/images/start-button.png';

const Taskbar = () => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const startMenuRef = useRef(null);

  // Toggle the start menu open/close
  const toggleStartMenu = (event) => {
    event.stopPropagation(); // Prevents click outside logic from instantly closing it
    setIsStartMenuOpen((prev) => !prev);
  };

  // Close the start menu when clicking outside
  const handleClickOutside = (event) => {
    if (startMenuRef.current && !startMenuRef.current.contains(event.target)) {
      setIsStartMenuOpen(false);
    }
  };

  // Add/remove event listener for outside clicks
  useEffect(() => {
    if (isStartMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isStartMenuOpen]);

  return (
    <div className={styles.taskbar}>
      <div 
        className={styles.startButton} 
        onClick={toggleStartMenu}
      >
        <img 
          className={styles.startButtonIcon} 
          src={startButtonIcon} 
          alt="Start Button" 
        />
      </div>

      {isStartMenuOpen && (
        <div ref={startMenuRef} className={styles.startMenu}>
          <ul className={styles.startMenuList}>
            <li>Programs</li>
            <li>Documents</li>
            <li>Settings</li>
            <li>Find</li>
            <li>Help</li>
            <li>Run</li>
            <li>Shut Down</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Taskbar;
