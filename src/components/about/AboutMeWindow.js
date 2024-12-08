import React from 'react';
import styles from './AboutMeWindow.module.css';

const AboutMeWindow = () => {
  return (
    <div className={styles.aboutMeWindow}>
      <h1>Hello! I am Hayden Janes</h1>
      <h3>I am a ReactJS Developer</h3>
      <p>
        I started at <strong>Bay Valley Tech</strong> in Modesto, CA
        <br />
         for <strong>2 years</strong> for an internship opportunnity.
        <br />
        <br />
        During this time, I practiced <strong>HTML</strong>, <strong>CSS</strong>, <strong>React</strong>, and <strong>MySQL</strong> through 
        lessons on Discord and assignments from platforms like <strong>Scrimba</strong> and <strong>Codecademy</strong>.
        I also contributed to <strong>Group GitHub Projects</strong> to experience working in teams.
      </p>
      <p>
        Since then, I’ve developed multiple test projects to expand my skills even further, if you wish to see more click below.
      </p>
      <p>
        <a 
          href="https://github.com/your-github-profile" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.githubLink}
        >
          Click here to visit my GitHub Profile
        </a>
      </p>
    </div>
  );
};

export default AboutMeWindow;
