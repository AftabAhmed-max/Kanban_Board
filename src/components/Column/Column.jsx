import { useState } from 'react';
import { Draggable } from "@hello-pangea/dnd";
import styles from './Column.module.css';
import Card from '../Card/Card';
import TaskModal from '../Modals/TaskModal';

const getAccent = (title) => {
  if (title === "To Do") return "var(--column-header-todo)";
  if (title === "In Progress") return "var(--column-header-inprogress)";
  if (title === "Done") return "var(--column-header-done)";
  return "var(--primary)";
};

const Column = ({ title, tasks, columnId, addTask, deleteTask }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddTask = (task) => {
    addTask(columnId, task);
    setShowModal(false);
  };

  return (
    <section className={styles.column}>
      <header className={styles.header}>
        <span
          className={styles.accent}
          style={{ background: getAccent(title) }}
        />
        <span className={styles.title}>{title}</span>
        <span className={styles.count}>{tasks.length}</span>
      </header>
      <div className={styles.cards}>
        {tasks.map((task, idx) => (
          <Draggable key={task.id} draggableId={task.id} index={idx}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={snapshot.isDragging ? styles.draggingWrapper : ""}
                style={{
                  ...provided.draggableProps.style,
                  marginBottom: "1rem",
                  borderRadius: "12px",
                  zIndex: snapshot.isDragging ? 1000 : "auto",
                }}
              >
                <Card
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  daysLeft={task.daysLeft}
                  onDelete={() => deleteTask(columnId, task.id)}
                  isDragging={snapshot.isDragging}
                />
              </div>
            )}
          </Draggable>
        ))}
      </div>
      <button className={styles.addTask} onClick={() => setShowModal(true)}>
        + Add Task
      </button>
      {showModal && (
        <TaskModal
          onClose={() => setShowModal(false)}
          onSave={handleAddTask}
        />
      )}
    </section>
  );
};

export default Column;
