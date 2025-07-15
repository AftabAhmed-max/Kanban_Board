import styles from './Card.module.css';

const priorityIcons = {
  High: "🔥",
  Medium: "⚡",
  Low: "🟢"
};

const priorityColors = {
  High: "#f27373",
  Medium: "#f7b955",
  Low: "#6ecf6e"
};

const Card = ({
  title = "Task Title",
  description = "Task details or summary go here.",
  priority = "High",
  daysLeft = 7,
  onDelete,
  isDragging
}) => {
  return (
    <div
      className={`${styles.card} ${isDragging ? styles.draggingCard : ""}`}
    >
      <div className={styles.cardTop}>
        <span
          className={styles.priority}
          style={{ background: priorityColors[priority] }}
        >
          {priorityIcons[priority]} {priority}
        </span>
        <span className={styles.daysLeft}>{daysLeft}d left</span>
        {onDelete && (
          <button
            className={styles.deleteBtn}
            onClick={onDelete}
            title="Delete Task"
          >
            ✕
          </button>
        )}
      </div>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default Card;
