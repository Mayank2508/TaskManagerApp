import React, { useState } from 'react';
import axios from 'axios';
import './TaskCard.css'; // Optional: For styling the task card

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const { _id, title, description, completed, dueDate } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedCompleted, setEditedCompleted] = useState(completed);
  const [editedDueDate, setEditedDueDate] = useState(dueDate);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const updatedTask = {
      title: editedTitle,
      description: editedDescription,
      completed: editedCompleted,
      dueDate: editedDueDate,
    };

    try {
      const response = await axios.put(`/tasks/${_id}`, updatedTask);
      if (response.status === 200) {
        setIsEditing(false);
        onUpdate(response.data);
      }
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await axios.delete(`/tasks/${_id}`);
      if (response.status === 200) {
        onDelete(_id);
      }
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <div className="task-card">
      {isEditing ? (
        <div>
          <input 
            type="text" 
            value={editedTitle} 
            onChange={(e) => setEditedTitle(e.target.value)} 
          />
          <textarea 
            value={editedDescription} 
            onChange={(e) => setEditedDescription(e.target.value)} 
          />
          <label>
            <input 
              type="checkbox" 
              checked={editedCompleted} 
              onChange={(e) => setEditedCompleted(e.target.checked)} 
            />
            Completed
          </label>
          <input 
            type="date" 
            value={editedDueDate} 
            onChange={(e) => setEditedDueDate(e.target.value)} 
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <h1>{title}</h1>
          <h4>{description}</h4>
          <p>Status: {completed ? 'Completed' : 'Pending'}</p>
          <p>Due Date: {new Date(dueDate).toLocaleDateString()}</p>
          <button onClick={handleUpdateClick}>Update Details</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;



