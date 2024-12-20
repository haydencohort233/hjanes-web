import React, { useState, useEffect, useRef } from 'react';
import DesktopIcon from './components/DesktopIcon';
import './App.css';
import Taskbar from './components/Taskbar';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [isCardDragging, setIsCardDragging] = useState(false);
  const [cardOffset, setCardOffset] = useState({ x: 0, y: 0 });
  const [avatarPosition, setAvatarPosition] = useState({ x: 250, y: 0 });
  const [isAvatarDragging, setIsAvatarDragging] = useState(false);
  const [avatarOffset, setAvatarOffset] = useState({ x: 0, y: 0 });
  const [isAvatarVisible, setIsAvatarVisible] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isSkillsWindowVisible, setIsSkillsWindowVisible] = useState(false);
  const [skillsPosition, setSkillsPosition] = useState({ x: 0, y: 0 });
  const [isSkillsDragging, setIsSkillsDragging] = useState(false);
  const [skillsOffset, setSkillsOffset] = useState({ x: 0, y: 0 });

  const skills = [
    {
      name: "HTML", level: "Proficient",
      description: "The standard markup language for documents designed to be displayed in a web browser.",
    },
    {
      name: "CSS", level: "Proficient",
      description: "A language for describing the presentation of web pages.",
    },
    {
      name: "React", level: "Advanced",
      description: "A JavaScript library for building user interfaces.",
    },
    {
      name: "Node.js", level: "Proficient",
      description: "A JavaScript runtime built on Chrome's V8 engine.",
    },
    {
      name: "Next.js", level: "Intermediate",
      description: "A React framework for production.",
    },
    {
      name: "JavaScript", level: "Advanced",
      description: "A high-level, just-in-time compiled programming language.",
    },
    {
      name: "TypeScript", level: "Intermediate",
      description: "A strongly typed programming language that builds on JavaScript.",
    },
    {
      name: "SQL", level: "Entry",
      description: "A domain-specific language used in programming for managing relational databases.",
    }
  ];

  /* Previous skill displayed */
  const handlePrevious = () => {
    setCurrentSkillIndex((prevIndex) =>
      prevIndex === 0 ? skills.length - 1 : prevIndex - 1
    );
  };

  /* Next skill displayed */
  const handleNext = () => {
    setCurrentSkillIndex((prevIndex) =>
      prevIndex === skills.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleSkillClick = (index) => {
    setCurrentSkillIndex(index);
  };

  /* Handles dragging all of windows */
  const handleCardMouseDown = (e) => {
    setIsCardDragging(true);
    setCardOffset({
      x: e.clientX - cardPosition.x,
      y: e.clientY - cardPosition.y,
    });
    document.body.classList.add('noselect');
  };

  const handleCardMouseMove = (e) => {
    if (isCardDragging) {
      setCardPosition({
        x: e.clientX - cardOffset.x,
        y: e.clientY - cardOffset.y,
      });
    }
  };

  const handleCardMouseUp = () => {
    setIsCardDragging(false);
    document.body.classList.remove('noselect');
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - modalPosition.x,
      y: e.clientY - modalPosition.y,
    });
    document.body.classList.add('noselect');
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setModalPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.classList.remove('noselect');
  };

  const handleAvatarMouseDown = (e) => {
    setIsAvatarDragging(true);
    setAvatarOffset({
      x: e.clientX - avatarPosition.x,
      y: e.clientY - avatarPosition.y,
    });
    document.body.classList.add('noselect');
  };

  const handleAvatarMouseMove = (e) => {
    if (isAvatarDragging) {
      setAvatarPosition({
        x: e.clientX - avatarOffset.x,
        y: e.clientY - avatarOffset.y,
      });
    }
  };

  const handleAvatarMouseUp = () => {
    setIsAvatarDragging(false);
    document.body.classList.remove('noselect');
  };

  const handleSkillsMouseDown = (e) => {
    setIsSkillsDragging(true);
    setSkillsOffset({
      x: e.clientX - skillsPosition.x,
      y: e.clientY - skillsPosition.y,
    });
    document.body.classList.add('noselect');
  };

  const handleSkillsMouseMove = (e) => {
    if (isSkillsDragging) {
      setSkillsPosition({
        x: e.clientX - skillsOffset.x,
        y: e.clientY - skillsOffset.y,
      });
    }
  };

  const handleSkillsMouseUp = () => {
    setIsSkillsDragging(false);
    document.body.classList.remove('noselect');
  };

  return (
    <div className="App">
      <div className="main-content">
      {isAvatarVisible && (
        <div
          className="avatar-window"
          style={{
            transform: `translate(${avatarPosition.x}px, ${avatarPosition.y}px)`,
            cursor: isAvatarDragging ? 'grabbing' : 'grab',
            position: 'fixed',
            zIndex: 1000,
          }}
          onMouseDown={handleAvatarMouseDown}
          onMouseMove={handleAvatarMouseMove}
          onMouseUp={handleAvatarMouseUp}
          onMouseLeave={handleAvatarMouseUp}
        >
          <div className="window-header">
            <span className="window-title">avatar.png</span>
            <button className="btn-close" onClick={() => setIsAvatarVisible(false)}>X</button>
          </div>
          <div className="avatar-container">
            <img src="/assets/avatar/avatar.png" alt="Avatar" className="avatar" />
          </div>
        </div>
      )}

        {/* Card Body */}
        <div className="container mt-4">
        {isCardVisible && (
          <div
            className="card mt-4"
            style={{
              transform: `translate(${cardPosition.x}px, ${cardPosition.y}px)`,
              cursor: isCardDragging ? 'grabbing' : 'grab',
              position: 'fixed',
              zIndex: 999,
              left: '0px',
            }}
            onMouseDown={handleCardMouseDown}
            onMouseMove={handleCardMouseMove}
            onMouseUp={handleCardMouseUp}
            onMouseLeave={handleCardMouseUp}
          >
            <div className="card-header">
              Hayden Janes's Intro
              <button className="btn btn-secondary btn-close" onClick={() => setIsCardVisible(false)}>X</button>
            </div>
            <div className="card-body">
              <p>
                I am Hayden Janes, a Jr. Web Developer. <br />
                I have experience in React, Node, Next, JavaScript, TypeScript, CSS.
              </p>
              <div className="card-footer">
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                  More Details
                </button>
              </div>
            </div>
          </div>
        )}

          {showModal && (
            <div
              className="modal-content"
              style={{
                transform: `translate(${modalPosition.x}px, ${modalPosition.y}px)`,
                cursor: isDragging ? "grabbing" : "grab",
                position: "fixed",
                zIndex: 999,
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <div className="modal-header">
                <h5 className="modal-title">More Details</h5>
                <button className="btn" onClick={() => setShowModal(false)}>
                  X
                </button>
              </div>
              <div className="modal-body">
                <p>I am a Jr. Web Developer and UI/UX Designer.</p>
                <p>I love making professional-looking pages for people to help their business.</p>

                <p>I learned initially from:</p>
                <ul>
                  <li>Bay Valley Tech</li>
                  <li>Scrimba Lessons</li>
                  <li>CodeAcademy</li>
                </ul>

                <p>I continued learning by doing personal projects such as:</p>
                <ul>
                  <li>This Portfolio!</li>
                  <li>Google Jobs API Web Scraper</li>
                  <li>Personal Chat Messenger</li>
                  <li>3D Printing Website</li>
                  <li>Remaking my favorite websites</li>
                  <li>Making updated business pages for local businesses for practice</li>
                </ul>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isSkillsWindowVisible && (
        <div
          className="skills-window"
          style={{
            transform: `translate(${skillsPosition.x}px, ${skillsPosition.y}px)`,
            cursor: isSkillsDragging ? 'grabbing' : 'grab',
            position: 'fixed',
            zIndex: 999,
          }}
          onMouseDown={handleSkillsMouseDown}
          onMouseMove={handleSkillsMouseMove}
          onMouseUp={handleSkillsMouseUp}
          onMouseLeave={handleSkillsMouseUp}
        >
          <div className="window-header">
            <span className="window-title">Skills</span>
            <button className="btn-close" onClick={() => setIsSkillsWindowVisible(false)}>X</button>
          </div>
          <div className="window-content">
            {/* Skills List on the left */}
            <div className="skills-list">
              <ul>
                {skills.map((skill, index) => (
                  <li
                    key={index}
                    className={currentSkillIndex === index ? 'active-skill' : ''}
                    onClick={() => handleSkillClick(index)}
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skill Details on the right */}
            <div className="skill-details">
              <h2>{skills[currentSkillIndex].name}</h2>
              <p><strong>Level:</strong> {skills[currentSkillIndex].level}</p>
              <p>{skills[currentSkillIndex].description}</p>

              <div className="navigation-buttons">
                <button className="btn btn-primary" onClick={handlePrevious}>Previous</button>
                <button className="btn btn-primary" onClick={handleNext}>Next</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop icons */}
      <div className="desktop-icons">
        <div className="desktop-icon-github">
          <DesktopIcon 
            icon="/assets/desktop/github.png" 
            label="My GitHub" 
            onClick={() => window.open('https://github.com/haydencohort233', '_blank')} 
          />
        </div>

        <div className="desktop-icon-linkedin">
          <DesktopIcon 
            icon="/assets/desktop/linkedin.png" 
            label="LinkedIn" 
            onClick={() => window.open('https://linkedin.com/in/haydenjanes', '_blank')} 
          />
        </div>
        <div className="desktop-icon-discord">
          <DesktopIcon 
            icon="/assets/desktop/music.png" 
            label="Music" 
            onClick={() => window.open('https://linkedin.com/in/haydenjanes', '_blank')} 
          />
        </div>
        <div className="desktop-icon-projects">
          <DesktopIcon 
            icon="/assets/desktop/projects.png" 
            label="Intro Card" 
            onClick={() => setIsCardVisible(true)} 
          />
        </div>
        <div className="desktop-icon-avatar">
          <DesktopIcon 
            icon="/assets/avatar/avatar.png" 
            label="avatar.png" 
            onClick={() => setIsAvatarVisible(true)} 
          />
        </div>
        <div className="desktop-icon-skills">
          <DesktopIcon
            icon="/assets/desktop/calculator.png"
            label="Skills"
            onClick={() => setIsSkillsWindowVisible(true)}
          />
        </div>
      </div>

      {/* Taskbar Component */}
      <Taskbar />

    </div>
  );
}

export default App;
