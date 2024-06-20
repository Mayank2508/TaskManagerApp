import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Assuming you have a CSS file for header styles

const Header = () => {
  const navigate = useNavigate();

  const handleNewTaskClick = () => {
    navigate('/new-task');
  };

  return (
    <header className="header">
      <h1>Task Manager</h1>
      <button className="new-task-button" onClick={handleNewTaskClick}>
        New Task
      </button>
    </header>
  );
};

export default Header;
