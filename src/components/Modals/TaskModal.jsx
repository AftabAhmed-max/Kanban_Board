import { useState } from 'react';
import styles from './TaskModal.module.css';

const TaskModal = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('High');
  const [daysLeft, setDaysLeft] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title, description, priority, daysLeft });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose} tabIndex={0}>✕</button>
        <h2 className={styles.heading}>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} type="text" required autoFocus />
          </div>
          <div className={styles.field}>
            <label>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Days Left</label>
            <input value={daysLeft} onChange={e => setDaysLeft(e.target.value)} type="number" min="0" max="60" />
          </div>
          <button className={styles.save} type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
