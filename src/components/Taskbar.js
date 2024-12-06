import React from 'react';
import styles from './Taskbar.module.css';
import startButtonIcon from '../assets/images/start-button.png';

const Taskbar = () => {
  return (
    <div className={styles.taskbar}>
      <div className={styles.startButton}>
        <img className="startButton" src={startButtonIcon} alt="Start Button" />
      </div>
    </div>
  );
};

export default Taskbar;
