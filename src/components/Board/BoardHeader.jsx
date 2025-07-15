import styles from './BoardHeader.module.css';

const BoardHeader = ({ filter, setFilter, sort, setSort }) => (
  <div className={styles.headerBar}>
    <input
      className={styles.filterInput}
      placeholder="Search tasks..."
      value={filter}
      onChange={e => setFilter(e.target.value)}
    />
    <div className="styles wrapper">
      <select
        className={styles.sortSelect}
        value={sort}
        onChange={e => setSort(e.target.value)}
      >
        <option value="default">Sort by...</option>
        <option value="priority">Priority</option>
        <option value="due">Due Date</option>
        <option value="az">A-Z</option>
      </select>
    </div>
  </div>
);

export default BoardHeader;
