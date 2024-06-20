import React, { useState } from 'react';
import axios from 'axios';
import './NewTask.css'; // Import the CSS file

const NewTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      completed,
      dueDate,
    };

    try {
      const response = await axios.post('/tasks', newTask);
      if (response.status === 200) {
        // Handle successful task creation (e.g., redirect or display a message)
      }
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  return (
    <div className="new-task">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          ></textarea>
        </div>
        <div className="form-group-inline">
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input 
              type="date" 
              id="dueDate" 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="checkbox" 
              id="completed" 
              checked={completed} 
              onChange={(e) => setCompleted(e.target.checked)} 
            />
            <label htmlFor="completed">Completed</label>
          </div>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default NewTask;
