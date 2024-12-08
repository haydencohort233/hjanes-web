import React, { useState, useEffect } from 'react';
import styles from './SkillsWindow.module.css';

const SkillsWindow = () => {
  const skills = [
    { id: 'skill-1', name: 'JavaScript', description: 'Deep understanding of JavaScript concepts like closures, async/await, and event delegation.', years: 1 },
    { id: 'skill-2', name: 'React', description: 'Experience with React, hooks, context, and dynamic SPAs.', years: 1 },
    { id: 'skill-3', name: 'Node.js', description: 'Server-side development with Node.js and Express.js for REST APIs.', years: 1 },
    { id: 'skill-4', name: 'MySQL', description: 'Experience with relational databases, query optimization, and SQL queries.', years: 1 },
    { id: 'skill-5', name: 'Git', description: 'Proficiency with Git, branching, and managing version control for projects.', years: 1 },
    { id: 'skill-6', name: 'Etc', description: 'Etc', years: 1 },

];

  const [selectedSkill, setSelectedSkill] = useState(skills[0]);

  useEffect(() => {
    setSelectedSkill(skills[0]); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  return (
    <div className={styles.skillsWindow}>
      <div className={styles.skillsList}>
        <h3>Skills</h3>
        <ul>
          {skills.map((skill) => (
            <li 
              key={skill.id} 
              className={selectedSkill.id === skill.id ? styles.active : ''} 
              onClick={() => handleSkillClick(skill)}
            >
              {skill.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.skillDetails}>
        <h3>{selectedSkill.name}</h3>
        <p>{selectedSkill.description}</p>
        <div className={styles.yearsExperience}>
          <strong>Years of Experience:</strong> {selectedSkill.years} {selectedSkill.years === 1 ? 'year' : 'years'}
        </div>
      </div>
    </div>
  );
};

export default SkillsWindow;
